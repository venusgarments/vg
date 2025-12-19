require("dotenv").config();

const orderService = require("../services/order.service");
const productService = require("../services/product.service");
const userService = require("../services/user.service");

const Groq = require("groq-sdk");
const Redis = require("redis");
const leoProfanity = require("leo-profanity");

// ===============================
// ✅ PROFANITY SETUP
// ===============================
try {
  leoProfanity.loadDictionary();
} catch {}

const isProfane = (text = "") => {
  try {
    return leoProfanity.check(String(text));
  } catch {
    return false;
  }
};

// ===============================
// ✅ GROQ LLM SETUP
// ===============================
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const GROQ_MODEL = "llama-3.1-8b-instant";

// ===============================
// ✅ REDIS + IN-MEMORY FALLBACK
// ===============================
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const SESSION_TTL = Number(process.env.SESSION_TTL || 600);

let redisClient = null;
let redisAvailable = false;
const memoryStore = new Map();

async function initRedis() {
  try {
    redisClient = Redis.createClient({ url: REDIS_URL });
    redisClient.on("ready", () => {
      redisAvailable = true;
      console.log("✅ Redis Connected");
    });
    redisClient.on("error", () => {
      redisAvailable = false;
    });
    await redisClient.connect();
  } catch {
    console.warn("⚠️ Redis Not Available → Using In-Memory Store");
    redisAvailable = false;
  }
}
initRedis();

const getSession = async (userId) => {
  const key = `session:${userId}`;
  if (redisAvailable && redisClient) {
    const raw = await redisClient.get(key);
    return raw ? JSON.parse(raw) : { history: [] };
  }
  return memoryStore.get(key) || { history: [] };
};

const saveSession = async (userId, session) => {
  const key = `session:${userId}`;
  if (redisAvailable && redisClient) {
    return redisClient.setEx(key, SESSION_TTL, JSON.stringify(session));
  }
  memoryStore.set(key, session);
};

// ===============================
// ✅ UTILITIES
// ===============================
const normalize = (s = "") => String(s).trim();

const redactPII = (text = "") =>
  String(text)
    .replace(/\b\d{12,19}\b/g, "[REDACTED_CARD]")
    .replace(/\b\d{10}\b/g, "[REDACTED_PHONE]")
    .replace(/\S+@\S+\.\S+/g, "[REDACTED_EMAIL]");

// ✅ GROQ CALL
const safeSendToLLM = async (prompt) => {
  try {
    console.log("✅ USING GROQ MODEL:", GROQ_MODEL);

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are a professional Indian e-commerce AI assistant. Talk naturally like ChatGPT.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 350,
    });

    return completion.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error("❌ Groq Error:", err.message);
    return null;
  }
};

// ===============================
// ✅ MAIN ADVANCED AI CONTROLLER
// ===============================
const aiChatAssistant = async (req, res) => {
  try {
    // ✅ FROM YOUR authenticate MIDDLEWARE
    const user = req.user;
    const rawMessage = normalize(req.body.message || "");

    if (!user)
      return res.status(401).json({ reply: "Authentication required." });
    if (!rawMessage) return res.json({ reply: "Please type a message." });

    if (isProfane(rawMessage)) {
      return res.json({ reply: "⚠️ Please use respectful language." });
    }

    const cleanedMessage = redactPII(rawMessage);
    const session = await getSession(user._id);
    session.history = session.history || [];

    // ======================================================
    // ✅ 1) BUSINESS LOGIC FIRST (FAST, ACCURATE)
    // ======================================================

    // ✅ Latest Order
    if (/latest order|last order|my order/i.test(cleanedMessage)) {
      const orders = await orderService.usersOrderHistory(user._id);
      if (!orders.length)
        return res.json({ reply: "You haven't placed any orders yet." });

      const latest = orders[0];
      const reply = `🧾 Latest Order: ${latest.orderItems[0]?.name}\n📦 Status: ${latest.orderStatus}\n💰 Total: ₹${latest.totalPrice}`;
      session.history.push({
        user: cleanedMessage,
        bot: reply,
        ts: Date.now(),
      });
      await saveSession(user._id, session);
      return res.json({ reply });
    }

    // ✅ Super Coins
    if (/super\s*coins?|reward\s*points?/i.test(cleanedMessage)) {
      const reply = `💰 You currently have ${
        user.superCoins || 0
      } Super Coins.`;
      session.history.push({
        user: cleanedMessage,
        bot: reply,
        ts: Date.now(),
      });
      await saveSession(user._id, session);
      return res.json({ reply });
    }

    // ✅ Product Price
    const priceMatch = cleanedMessage.match(/price of (.+)/i);
    if (priceMatch) {
      const query = priceMatch[1];
      const products = await productService.searchProducts(query);
      if (!products.length) {
        return res.json({ reply: "❌ I couldn't find that product." });
      }

      const p = products[0];
      const reply = `🛍️ ${p.title || p.name}\n💰 Price: ₹${p.price}`;
      session.history.push({
        user: cleanedMessage,
        bot: reply,
        ts: Date.now(),
      });
      await saveSession(user._id, session);
      return res.json({ reply });
    }

    // ✅ Category Listing
    const categoryMatch = cleanedMessage.match(/show me (.+)/i);
    if (categoryMatch) {
      const category = categoryMatch[1];
      const products = await productService.getProductsByCategoryName(
        category,
        6
      );
      if (!products.length)
        return res.json({ reply: `No items found in ${category}.` });

      const list = products.map((p) => `• ${p.title} – ₹${p.price}`).join("\n");
      const reply = `Here are some ${category}:\n\n${list}`;
      session.history.push({
        user: cleanedMessage,
        bot: reply,
        ts: Date.now(),
      });
      await saveSession(user._id, session);
      return res.json({ reply });
    }

    // ✅ Product Details
    if (/tell me about|describe|details of/i.test(cleanedMessage)) {
      const query = cleanedMessage
        .replace(/tell me about|describe|details of/i, "")
        .trim();
      const products = await productService.searchProducts(query);
      if (!products.length) return res.json({ reply: "❌ Product not found." });

      const p = products[0];
      const reply = `📦 ${p.title}\n💰 Price: ₹${p.price}\n⭐ Rating: ${
        p.rating || "N/A"
      }`;
      session.history.push({
        user: cleanedMessage,
        bot: reply,
        ts: Date.now(),
      });
      await saveSession(user._id, session);
      return res.json({ reply });
    }
    // ✅ Customer Care / Support Number
    if (
      /customer\s*(care|support)|support\s*number|contact\s*(us|number)|help\s*line|call\s*(you|support)/i.test(
        cleanedMessage
      )
    ) {
      const reply = `📞 You can contact our Customer Support at:\n\n✅ +91 750 077 3292\n🕘 Available: 10 AM – 7 PM (Mon–Sat)\n\nWe’re always happy to help you! 😊`;

      session.history.push({
        user: cleanedMessage,
        bot: reply,
        ts: Date.now(),
      });
      await saveSession(user._id, session);
      return res.json({ reply });
    }

    // ======================================================
    // ✅ 2) ALWAYS FALLBACK TO GROQ (NORMAL CHAT + MIXED)
    // ======================================================
    const lastContext = session.history
      .slice(-5)
      .map((h) => `User: ${h.user}\nAssistant: ${h.bot}`)
      .join("\n");

    const prompt = `
You are a friendly Indian e-commerce AI assistant.
You can chat normally AND help with shopping.
Use INR currency.
Be short, friendly, and clear.

Conversation:
${lastContext}

User: ${cleanedMessage}
Assistant:
`;

    const groqReply = await safeSendToLLM(prompt);

    if (groqReply) {
      session.history.push({
        user: cleanedMessage,
        bot: groqReply,
        ts: Date.now(),
      });
      await saveSession(user._id, session);
      return res.json({ reply: groqReply });
    }

    // ✅ Only if Groq fails
    return res.json({
      reply: "⚠️ AI is currently unavailable. Please try again shortly.",
    });
  } catch (err) {
    console.error("❌ AI CONTROLLER ERROR:", err);
    return res.status(500).json({ reply: "AI system error." });
  }
};

module.exports = { aiChatAssistant };
