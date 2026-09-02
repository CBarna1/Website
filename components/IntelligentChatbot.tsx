"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  inquiry: string;
}

function TypewriterText({ text, speed = 18 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");

    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [text, speed]);

  return (
    <>
      {displayedText.split("\n").map((line, i) => (
        <div key={i}>{line || " "}</div>
      ))}
    </>
  );
}

export default function IntelligentChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! 👋 Welcome to Kelson Innovations. I'm here to help with network solutions, IT hardware, CCTV systems, and more. What can I help you with?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadStage, setLeadStage] = useState<"name" | "email" | "phone" | "inquiry" | null>(null);
  const [leadData, setLeadData] = useState<LeadData>({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const resetLeadFlow = () => {
    setLeadStage(null);
    setLeadData({ name: "", email: "", phone: "", inquiry: "" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const currentInput = inputValue.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    if (leadStage) {
      const nextLead = { ...leadData };

      if (leadStage === "name") {
        nextLead.name = currentInput;
        setLeadData(nextLead);
        setLeadStage("email");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Thanks! What is your email address?",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        return;
      }

      if (leadStage === "email") {
        nextLead.email = currentInput;
        setLeadData(nextLead);
        setLeadStage("phone");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Great. What is your phone number?",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        return;
      }

      if (leadStage === "phone") {
        nextLead.phone = currentInput;
        setLeadData(nextLead);
        setLeadStage("inquiry");
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: "Perfect. What product or service are you interested in?",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        return;
      }

      if (leadStage === "inquiry") {
        nextLead.inquiry = currentInput;
        setLeadData(nextLead);

        try {
          const response = await fetch("/api/chatbot/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: nextLead.name,
              email: nextLead.email,
              phone: nextLead.phone,
              inquiry: nextLead.inquiry,
              interest: nextLead.inquiry,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Unable to send your inquiry.");
          }

          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: "✅ Thanks! Your inquiry has been sent to our sales team at sales@kelson.co.zm. They will contact you shortly.",
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
          resetLeadFlow();
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unable to send inquiry.";
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              text: `⚠️ ${message}\n\nPlease call us on +260 211 261 000 or email sales@kelson.co.zm directly.`,
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
          resetLeadFlow();
        }

        setIsLoading(false);
        return;
      }
    }

    const lowerInput = currentInput.toLowerCase();
    const wantsQuote = /(quote|pricing|estimate|budget|how much|buy|purchase|interested in|need a quote|looking for a quote)/i.test(lowerInput);

    if (wantsQuote) {
      setLeadStage("name");
      setLeadData({ name: "", email: "", phone: "", inquiry: "" });
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Absolutely. I can help with that. What is your name?",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/chatbot/intelligent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to get response from chatbot");
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";

      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: `⚠️ Error: ${errorMessage}\n\nPlease check your Groq configuration or call us at +260 211 261 000.`,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition hover:bg-brand-700 hover:shadow-xl dark:bg-brand-500 dark:hover:bg-brand-600"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chatbot Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[600px] w-[420px] flex-col rounded-lg border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:w-[380px] md:w-[420px]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-brand-600 px-4 py-3 text-white dark:border-slate-700 dark:bg-brand-700 rounded-t-lg">
            <div>
              <h2 className="font-semibold">Kel-bot</h2>
              <p className="text-xs opacity-90">Powered by AI 🤖</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="rounded p-1 hover:bg-brand-700 dark:hover:bg-brand-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 text-sm ${
                    message.sender === "user"
                      ? "bg-brand-600 text-white dark:bg-brand-700"
                      : "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <TypewriterText text={message.text} />
                  ) : (
                    message.text.split("\n").map((line, i) => <div key={i}>{line}</div>)
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-2">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-100" />
                    <div className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-950 rounded-b-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-brand-600 dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-brand-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="rounded-lg bg-brand-600 p-2 text-white hover:bg-brand-700 disabled:opacity-50 dark:bg-brand-700 dark:hover:bg-brand-600"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
