"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

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
            <h2 className="font-semibold">Chat with us</h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
              className="rounded p-1 hover:bg-brand-700 dark:hover:bg-brand-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chatbot Iframe */}
          <iframe
            src="https://copilotstudio.microsoft.com/environments/3d3d6571-9225-ef9a-8c0e-3e6e4b143a58/bots/new_KelbotWhatsApp/webchat?__version__=2"
            frameBorder="0"
            className="flex-1 w-full rounded-b-lg"
            title="Kelson Chatbot"
            allow="microphone; camera"
          />
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
