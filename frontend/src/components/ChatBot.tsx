import { BotMessageSquare, CircleX, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import faqData from "../utils/faq.json";

type Message = {
  text: any; // upgraded for rich answers
  sender: "user" | "bot";
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello 👋 How can I help you?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Auto Scroll (same)
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 🧠 ADVANCED MATCHING (keywords + questions + priority)
  const getBotReply = (input: string) => {
    const lower = input.toLowerCase();

    const match = faqData
      .sort((a: any, b: any) => a.priority - b.priority)
      .find(
        (item: any) =>
          item.keywords?.some((k: string) => lower.includes(k)) ||
          item.questions?.some((q: string) => lower.includes(q))
      );

    return match || faqData.find((item: any) => item.id === "fallback");
  };

  // 🎨 Render Answer (supports both string + object)
  const renderAnswer = (answer: any) => {
    if (typeof answer === "string") return answer;

    return (
      <div>
        <p className="font-semibold">{answer.title}</p>
        <p className="text-sm">{answer.description}</p>

        {answer.steps && (
          <ul className="list-disc ml-4 text-sm mt-1">
            {answer.steps.map((step: string, i: number) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        )}

        {answer.extra && (
          <p className="text-xs text-gray-500 mt-1">{answer.extra}</p>
        )}
      </div>
    );
  };

  // 📩 Send Message (same flow + upgrade)
  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg: Message = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(messageText);

      const botMsg: Message = {
        text: reply?.answer || reply,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-8 right-12 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
      >
        <BotMessageSquare />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-8 w-85 h-120 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ${
          isOpen
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-amber-500 text-white p-4 font-semibold flex justify-between items-center">
          <span>Fabricue Chat Support</span>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer hover:scale-120"
          >
            <CircleX />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-gray-50 text-sm">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-lg max-w-[75%] ${
                msg.sender === "bot"
                  ? "bg-white shadow-sm text-gray-700"
                  : "bg-amber-500 text-white ml-auto w-fit"
              }`}
            >
              {renderAnswer(msg.text)}
            </div>
          ))}

          {/* ⏳ Typing Indicator (upgraded animation, same styles container) */}
          {isTyping && (
            <div className="bg-white px-3 py-2 rounded-lg w-fit shadow-sm text-gray-500 text-xs flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          )}

          {/* Auto Scroll Anchor */}
          <div ref={chatEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="px-2 py-2 border-t bg-white max-h-35 overflow-y-auto">
          {faqData.slice(0, 5).map((item: any, i: number) => (
            <button
              key={i}
              onClick={() =>
                handleSend(item.questions?.[0] || item.question)
              }
              className="w-full text-left text-xs px-2 py-2 mb-1 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              {item.questions?.[0] || item.question}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2 bg-white">
          <input
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-lg px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping}
            className="bg-amber-500 hover:bg-amber-600 hover:scale-120 cursor-pointer text-white text-sm p-2 px-3 rounded-full disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;