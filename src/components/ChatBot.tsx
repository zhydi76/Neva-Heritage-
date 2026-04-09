import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Scissors, Loader2, Phone } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { translations, Language } from "../translations";

const SYSTEM_INSTRUCTION = `
You are a virtual assistant for the premium barbershop "Neva Heritage" in St. Petersburg.
Your goal is to help customers with information about services, prices, location, and booking.

Shop Information:
- Name: Neva Heritage Barbershop.
- Address: St. Petersburg, Nevsky Prospekt, 15.
- Working Hours: Daily from 10:00 to 22:00.
- Phone: +7 (812) 555-01-23.

Services and Prices:
1. Classic Haircut — 2500 ₽ (60 min). Includes hair wash, styling, and consultation.
2. Beard Grooming — 1800 ₽ (45 min). Shaping, straight razor contours, oil care.
3. Royal Shave — 3000 ₽ (60 min). Traditional shave with hot towel steaming.
4. Father and Son — 4000 ₽ (120 min). Haircut for two.

Communication Tone:
- Polite, professional, restrained but welcoming.
- Address the customer formally.
- If the customer wants to book, suggest leaving a request in the form on the website or calling by phone.

CRITICAL: Respond in the same language the user is using (Russian, English, or Kyrgyz).
If the question is not about the barbershop, politely say that you only specialize in Neva Heritage services.
`;

interface Message {
  role: "user" | "model";
  text: string;
}

export default function ChatBot({ lang }: { lang: Language }) {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset chat when language changes
  useEffect(() => {
    setMessages([{ role: "model", text: t.chatbot.welcome }]);
  }, [lang, t.chatbot.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });

      // We send the whole history for context
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await chat.sendMessage({
        message: userMessage
      });

      const botText = response.text || (lang === 'ru' ? "Извините, произошла ошибка. Попробуйте еще раз." : lang === 'en' ? "Sorry, an error occurred. Please try again." : "Кечиресиз, ката кетти. Кайра аракет кылып көрүңүз.");
      setMessages(prev => [...prev, { role: "model", text: botText }]);
    } catch (error) {
      console.error("ChatBot Error:", error);
      setMessages(prev => [...prev, { role: "model", text: lang === 'ru' ? "К сожалению, сервис временно недоступен. Пожалуйста, позвоните нам по телефону." : lang === 'en' ? "Unfortunately, the service is temporarily unavailable. Please call us by phone." : "Тилекке каршы, кызмат убактылуу иштебей жатат. Сураныч, бизге телефон аркылуу чалыңыз." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] bg-gold text-white p-4 rounded-full shadow-2xl hover:bg-gold/80 transition-all duration-300 group"
        id="chatbot-toggle"
      >
        {isOpen ? <X size={24} /> : <Phone size={24} className="group-hover:scale-110 transition-transform" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-[60] w-[350px] md:w-[400px] h-[500px] bg-white shadow-2xl rounded-2xl border border-gray-100 flex flex-col overflow-hidden"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="bg-gold p-4 flex items-center gap-3 border-b border-white/20">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                <Scissors size={20} />
              </div>
              <div>
                <h3 className="text-white font-serif text-lg leading-none">Neva Heritage</h3>
                <span className="text-white/80 text-[10px] uppercase tracking-widest font-bold">{t.chatbot.status}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-gold text-white rounded-tr-none shadow-md"
                        : "bg-white text-dark border border-gray-100 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white text-gold p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-4 bg-white border-t border-gray-100 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatbot.placeholder}
                className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl focus:border-gold outline-none text-sm transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-gold text-white p-2 rounded-xl hover:bg-gold/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
