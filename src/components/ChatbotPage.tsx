import React, { useRef, useState } from "react";
import "../chatbot_style.css"

interface Message {
  sender: "user" | "assistant";
  text: string;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

  const pushMessage = (m: Message) => {
    setMessages((prev) => {
      const next = [...prev, m];
      setTimeout(() => {
        if (chatWindowRef.current) {
          chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
      }, 50);
      return next;
    });
  };

  const sendMessageText = async (text: string) => {
    if (!text.trim()) return;
    pushMessage({ sender: "user", text });
    setIsLoading(true);

    try {
      const res = await fetch(OPENAI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-5-nano-2025-08-07",
          messages: [ {role: "system", content: "You are a helpful agriculture assistant in india, my cuurent location is pune todays date is 19-9-25."},{ role: "user", content: text }],
          
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        pushMessage({ sender: "assistant", text: `⚠️ OpenAI error: ${errText}` });
        return;
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content ?? "⚠️ No reply.";
      pushMessage({ sender: "assistant", text: reply });
    } catch (err) {
      console.error(err);
      pushMessage({ sender: "assistant", text: "⚠️ Error contacting OpenAI." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendMessageText(text);
  };

  const handleSuggestion = (text: string) => {
    sendMessageText(text);
  };

  return (
    <>
      {/* keep your CSS here (unchanged) */}

      <main className="app">
        <header className="app-header">
          <a className="back" href="#">← Back to Dashboard</a>
          <div className="title">
            <div className="logo"><img src="/favicon.ico" alt="logo" /></div>
            <div>
              <h1 id="appTitle">Agrow AI Assistant</h1>
              <p className="subtitle" id="appSubtitle">Get instant farming advice and insights</p>
            </div>
          </div>
          <div className="controls">
            <select id="langSelect" title="Select language">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          <div className="status">Online</div>
        </header>

        <section className="chat-panel">
          <div className="chat-window" ref={chatWindowRef}>
            <ul className="messages">
              {messages.map((msg, idx) => (
                <li key={idx} className={`msg ${msg.sender}`}>
                  <div className="avatar">{msg.sender === "user" ? "👤" : "🤖"}</div>
                  <div className="bubble" style={{ whiteSpace: "pre-wrap" }}>{msg.text}</div>
                </li>
              ))}
              {isLoading && (
                <li className="msg assistant">
                  <div className="avatar">🤖</div>
                  <div className="bubble typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="quick-suggestions">
            {[
              "Best crops for current season",
              "Weather forecast for my area",
              "Disease prevention tips",
              "Soil preparation advice",
              "Check crop market price",
            ].map((s, i) => (
              <button key={i} className="suggestion" onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>

          <form className="input-area" onSubmit={handleSend} autoComplete="off">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about farming..."
            />
            <button type="button" id="micBtn">🎤</button>
            <button type="submit" id="sendBtn">➤</button>
          </form>
        </section>
      </main>
    </>
  );
};

export default ChatbotPage;
