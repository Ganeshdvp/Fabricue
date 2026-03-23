import { BotMessageSquare } from "lucide-react";
import React, { useState } from "react";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-8 right-12 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg cursor-pointer animate-float transition-transform duration-300 hover:scale-110"
      >
        <BotMessageSquare />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ${
          isOpen ? "chat-open" : "chat-close"
        }`}
      >
        {/* Header */}
        <div className="bg-amber-500 text-white p-4 font-semibold flex justify-between items-center">
          <span>Fabricue Chat Support</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-3 overflow-y-auto text-sm text-gray-700 bg-gray-50">
          <div className="bg-white p-2 rounded-lg shadow-sm w-fit">
            Hello 👋 How can I help you?
          </div>
        </div>

        {/* Input */}
        <div className="p-2 border-t flex gap-2 bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 rounded-lg">
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;