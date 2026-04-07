import { BotMessageSquare, CircleX, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import faqData from "../utils/faq.json";

// Types
interface Answer {
  title?: string;
  description?: string;
  steps?: string[];
  note?: string;
  extra?: string;
}


interface FAQItem {
  id: string;
  category: string;
  tags: string[];
  question: string;
  answer: string | Answer;
  keywords?: string[];
  questions?: string[];
  priority: number;
}

interface Message {
  text: string | Answer;
  sender: "user" | "bot";
}

const ChatBot: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello 👋 How can I help you?", sender: "bot" },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Type-safe FAQ data
  const typedFaqData = faqData as FAQItem[];

  // Sort once (performance optimization)
  const sortedFaq = useMemo(
    () => [...typedFaqData].sort((a, b) => a.priority - b.priority),
    [typedFaqData]
  );

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Smart matching
  const getBotReply = (input: string): FAQItem => {
    const lower = input.toLowerCase();

    const match = sortedFaq.find(
      (item) =>
        item.keywords?.some((k) => lower.includes(k)) ||
        item.questions?.some((q) => lower.includes(q))
    );

    return (
      match ||
      sortedFaq.find((item) => item.id === "fallback") || {
        id: "fallback",
        category: "general",
        tags: [],
        question: "",
        answer: "Sorry, I didn’t understand that. Please try again.",
        priority: 999,
      }
    );
  };

  // Safe render
  const renderAnswer = (answer: string | Answer) => {
    if (typeof answer === "string") {
      return <p>{answer}</p>;
    }

    return (
      <div>
        {answer.title && (
          <p className="font-semibold">{answer.title}</p>
        )}
        {answer.description && (
          <p className="text-sm">{answer.description}</p>
        )}

        {answer.steps && (
          <ul className="list-disc ml-4 text-sm mt-1">
            {answer.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        )}

        {answer.extra && (
          <p className="text-xs text-gray-500 mt-1">
            {answer.extra}
          </p>
        )}
      </div>
    );
  };

  // Send message
  const handleSend = (text?: string) => {
    const messageText = text ?? input;

    if (!messageText.trim() || isTyping) return;

    const userMsg: Message = {
      text: messageText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(messageText);

      const botMsg: Message = {
        text: reply.answer,
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
        className="fixed bottom-4 right-6 sm:bottom-8 sm:right-12 z-50 bg-amber-500 hover:bg-amber-600 text-white p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer animate-float"
      >
        <BotMessageSquare />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-8 w-85 h-125 bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 transition-all duration-300 ${
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
            className="cursor-pointer hover:scale-110"
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

          {/* Typing Indicator */}
          {isTyping && (
            <div className="bg-white px-3 py-2 rounded-lg w-fit shadow-sm text-gray-500 text-xs flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Questions */}
        <div className="px-2 py-2 border-t bg-white max-h-32 overflow-y-auto">
          {sortedFaq.slice(0, 5).map((item, i) => (
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
        <div className="p-3 border-t flex gap-2 bg-white">
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
            className="bg-amber-500 hover:bg-amber-600 cursor-pointer text-white text-sm p-2 px-3 rounded-full disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBot;