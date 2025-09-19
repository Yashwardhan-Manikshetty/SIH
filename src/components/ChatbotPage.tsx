import React, { useState } from "react";

interface Message {
  sender: "user" | "assistant";
  text: string;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const newMessages: Message[] = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      if (!res.ok) throw new Error("Chat failed");
      const data = await res.json();
      setMessages([...newMessages, { sender: "assistant", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { sender: "assistant", text: "⚠️ Error contacting server." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
    handleSend();
  };

  return (
    <>
      {/* Embedded CSS */}
      <style>{`
        :root{
          --bg: #fbfaf6;
          --panel: #ffffff;
          --accent: #2e7d32;
          --muted: #8a8a86;
          --assist-bg: #e6f7ec;
          --user-bg: #ffffff;
          --bubble-border: rgba(0,0,0,0.06);
          --shadow: 0 8px 24px rgba(16,24,40,0.06);
          --radius: 12px;
        }

        *{box-sizing:border-box}
        html,body{height:100%;margin:0;font-family:Inter, "Segoe UI", Roboto, Arial, sans-serif;background:var(--bg);color:#111}
        .app{max-width:1100px;margin:20px auto;padding:18px;}

        .app-header{
          display:flex;align-items:center;justify-content:space-between;background:var(--panel);
          padding:18px;border-radius:12px;box-shadow:var(--shadow);margin-bottom:18px;
        }
        .back{color:var(--muted);text-decoration:none;margin-right:16px}
        .title{display:flex;gap:14px;align-items:center;flex:1}
        .logo{font-size:26px;background:#f0fdf4;border-radius:8px;padding:10px}
        .title h1{margin:0;font-size:20px;color:#13291b}
        .subtitle{margin:0;color:var(--muted);font-size:13px}
        .status{background:#e6f7ec;color:var(--accent);padding:8px 12px;border-radius:999px;font-weight:600}

        .chat-panel{background:var(--panel);padding:18px;border-radius:12px;box-shadow:var(--shadow);margin-bottom:18px}
        .chat-window{height:360px;overflow:auto;padding:6px;border-radius:10px;background:linear-gradient(180deg,#fbfff9,transparent);border:1px solid rgba(0,0,0,0.03)}
        .messages{list-style:none;padding:10px;margin:0;display:flex;flex-direction:column;gap:10px}

        .msg{display:flex;gap:10px;align-items:flex-end;max-width:86%}
        .msg.assistant{align-self:flex-start}
        .msg.user{align-self:flex-end;flex-direction:row-reverse}
        .avatar{width:40px;height:40px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;background:#fff;border:1px solid rgba(0,0,0,0.06);font-size:18px}
        .bubble{padding:12px 14px;border-radius:12px;background:var(--assist-bg);border:1px solid var(--bubble-border);box-shadow:0 2px 6px rgba(16,24,40,0.03)}
        .msg.user .bubble{background:var(--user-bg);border:1px solid rgba(0,0,0,0.06)}
        .msg small{display:block;color:var(--muted);font-size:11px;margin-top:6px}

        .typing-dots{display:inline-flex;gap:4px}
        .typing-dots span{display:inline-block;width:6px;height:6px;border-radius:50%;background:#7fbf7c;animation:blink 1s infinite}
        .typing-dots span:nth-child(2){animation-delay:.2s}
        .typing-dots span:nth-child(3){animation-delay:.4s}
        @keyframes blink{0%{opacity:0.2}50%{opacity:1}100%{opacity:0.2}}

        .quick-suggestions{display:flex;gap:10px;padding:12px 0;flex-wrap:wrap}
        .suggestion{background:transparent;border:1px solid rgba(46,125,50,0.12);color:var(--accent);padding:10px 14px;border-radius:12px;cursor:pointer;font-weight:600}
        .suggestion:hover{background:rgba(46,125,50,0.04)}

        .input-area{display:flex;gap:10px;padding-top:12px}
        .input-area input[type="text"]{
          flex:1;padding:12px;border-radius:12px;border:1px solid rgba(0,0,0,0.06);font-size:15px
        }
        .input-area button{background:var(--accent);color:#fff;padding:10px 14px;border-radius:10px;border:none;cursor:pointer;font-weight:700}
        #micBtn{background:#fff;border:1px solid rgba(0,0,0,0.06);color:var(--accent);font-size:16px}

        .features{display:flex;gap:18px;justify-content:space-between}
        .card{flex:1;background:var(--panel);padding:18px;border-radius:12px;box-shadow:var(--shadow);text-align:center;cursor:pointer;border:1px solid rgba(0,0,0,0.03)}
        .card .icon{font-size:28px;margin-bottom:6px}
        .card h3{margin:6px 0 2px 0}
        .card small{color:var(--muted)}

        @media (max-width:800px){
          .features{flex-direction:column}
          .app{padding:12px}
          .chat-window{height:300px}
        }

        .message .content { white-space: pre-wrap; }
      `}</style>

      <main className="app">
        {/* Header */}
        <header className="app-header">
          <a className="back" href="#">← Back to Dashboard</a>
          <div className="title">
            <div className="logo">🌱</div>
            <div>
              <h1 id="appTitle">Agrow AI Assistant</h1>
              <p className="subtitle" id="appSubtitle">
                Get instant farming advice and insights
              </p>
            </div>
          </div>
          <div className="controls">
            <select id="langSelect" title="Select language">
              <option value="en" defaultValue="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
          <div className="status">Online</div>
        </header>

        {/* Chat Section */}
        <section className="chat-panel">
          <div className="chat-window" id="chatWindow" role="log" aria-live="polite">
            <ul className="messages" id="messages">
              {messages.map((msg, idx) => (
                <li key={idx} className={`msg ${msg.sender}`}>
                  <div className="avatar">{msg.sender === "user" ? "👤" : "🤖"}</div>
                  <div className="bubble">{msg.text}</div>
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

          {/* Quick Suggestions */}
          <div className="quick-suggestions" id="suggestions">
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

          {/* Input */}
          <form id="inputForm" className="input-area" onSubmit={handleSend} autoComplete="off">
            <input
              id="messageInput"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about farming..."
              aria-label="Type your message"
            />
            <button type="button" id="micBtn" title="Voice input" aria-label="Voice input">
              🎤
            </button>
            <button type="submit" id="sendBtn" title="Send" aria-label="Send">
              ➤
            </button>
          </form>
        </section>

        {/* Features */}
        <section className="features">
          <div className="card" data-action="crop">
            <div className="icon">🍃</div>
            <h3 id="featureCrop">Crop Advice</h3>
            <small id="featureCropDesc">Get planting recommendations</small>
          </div>
          <div className="card" data-action="weather">
            <div className="icon">☔</div>
            <h3 id="featureWeather">Weather Insights</h3>
            <small id="featureWeatherDesc">Check weather conditions</small>
          </div>
          <div className="card" data-action="tips">
            <div className="icon">💡</div>
            <h3 id="featureTips">Farming Tips</h3>
            <small id="featureTipsDesc">Learn best practices</small>
          </div>
          <div className="card" data-action="price">
            <div className="icon">💰</div>
            <h3 id="featurePrice">Crop Market Price</h3>
            <small id="featurePriceDesc">
              Get real-time market prices for your crops and decide the best time to sell.
            </small>
          </div>
        </section>
      </main>
    </>
  );
};

export default ChatbotPage;
