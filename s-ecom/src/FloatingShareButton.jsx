import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";

export default function FloatingShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check this page",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.log("Share failed:", err);
    }
  };

  return (
    <>
      {/* Floating Share Button */}
      <button
        onClick={handleShare}
        className="fixed right-5 bottom-[170px] z-50 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition cursor-pointer"
      >
 <FaShareAlt />
      </button>

      {/* Small Copied Toast */}
      {copied && (
        <div className="fixed right-6 bottom-52 bg-black text-white text-sm px-3 py-1 rounded shadow">
          Link Copied!
        </div>
      )}
    </>
  );
}
