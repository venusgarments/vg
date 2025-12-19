require("dotenv").config();
const jwt = require("jsonwebtoken");
const SECERET_KEY =
  process.env.SECERET_KEY ||
  process.env.SECRET_KEY ||
  "your_default_secret_key_if_missing";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, SECERET_KEY, { expiresIn: "48h" });
  return token;
};

const getUserIdFromToken = (token) => {
  const decodedToken = jwt.verify(token, SECERET_KEY);
  return decodedToken.userId;
};

module.exports = { generateToken, getUserIdFromToken };
