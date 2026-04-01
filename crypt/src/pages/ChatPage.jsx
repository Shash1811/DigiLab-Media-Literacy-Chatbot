import * as React from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

import { Button } from "../components/ui/Button";
import { ChatInput } from "../components/ui/ChatInput";
import { MessageBubble } from "../components/ui/MessageBubble";
import { PageTransition } from "../components/ui/PageTransition";

import {
  MessageSquare,
  Plus,
  Image,
  FileText,
  Lightbulb,
  HelpCircle,
  Loader2,
} from "lucide-react";

import chatbotApi from "../lib/chatbotApi";

// -------------------- QUICK ACTIONS (UPDATED UI) --------------------
const QuickActionButtons = ({ onAction, disabled }) => {
  const actions = [
    { icon: FileText, label: "Study Notes", prompt: "Help me create study notes for Mass Communication." },
    { icon: Lightbulb, label: "Media Analysis", prompt: "Analyze this media content for journalism ethics." },
    { icon: HelpCircle, label: "Writing Help", prompt: "Help me improve my journalistic writing." },
    { icon: MessageSquare, label: "Research Skills", prompt: "Teach me research methods for journalism." }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-3xl mx-auto mb-8">
      {actions.map(({ icon: Icon, label, prompt }) => (
        <button
          key={label}
          onClick={() => onAction(prompt)}
          disabled={disabled}
          className="group rounded-2xl p-4 border bg-gradient-to-br from-zinc-50 to-white 
          dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-white/10
          hover:shadow-lg hover:-translate-y-1 active:scale-95 transition-all"
        >
          <div className="flex flex-col items-start gap-2">
            <div className="p-2 rounded-xl bg-white/70 dark:bg-black/30">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold">{label}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

// -------------------- MAIN COMPONENT --------------------
export function ChatPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [messages, setMessages] = React.useState([
    {
      role: "assistant",
      content: "Hello! I am DigiLab. How can I help you?",
    },
  ]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);

    setIsLoading(true);
    try {
      const res = await chatbotApi.sendMessage(text);
      const botMsg = { role: "assistant", content: res.answer };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error. Try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition className="flex h-screen w-full bg-gradient-to-br from-white to-zinc-100 dark:from-zinc-950 dark:to-black">

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center 
        rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
        shadow-xl hover:scale-105 active:scale-90 transition-all"
      >
        <Plus />
      </button>

      {/* MAIN */}
      <div className="flex flex-1 flex-col">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-white/10">
          <h1 className="font-semibold text-lg">DigiLab</h1>
        </div>

        {/* EMPTY STATE */}
        {messages.length <= 1 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">

            <div className="text-center mb-12 space-y-4">
              <h1 className="text-4xl font-bold">How can I help you?</h1>
              <p className="text-zinc-500 text-sm">
                Ask anything. Start learning faster.
              </p>
            </div>

            <QuickActionButtons onAction={handleSend} disabled={isLoading} />

            {/* INPUT */}
            <div className="w-full max-w-3xl">
              <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl 
              border border-zinc-200 dark:border-white/10 
              rounded-2xl shadow-lg p-3">
                <ChatInput onSend={handleSend} disabled={isLoading} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">

            {/* CHAT */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Loader2 className="animate-spin h-4 w-4" />
                    Thinking...
                  </div>
                )}

                <div ref={messagesEndRef}></div>
              </div>
            </div>

            {/* INPUT */}
            <div className="p-4">
              <div className="max-w-3xl mx-auto bg-white/80 dark:bg-zinc-900/80 
              backdrop-blur-xl border border-zinc-200 dark:border-white/10 
              rounded-2xl shadow-lg p-3">
                <ChatInput onSend={handleSend} disabled={isLoading} />
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}