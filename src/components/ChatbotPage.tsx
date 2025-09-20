import React, { useRef, useState } from "react";
import "../chatbot_style.css";

interface Message {
  sender: "user" | "assistant";
  text: string;
  image?: string;
}

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement | null>(null);

  const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

  // 🔹 Scroll helper
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

  // 🔹 Text-to-Speech
  const speak = (text: string, lang: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN";
    speechSynthesis.speak(utterance);
  };

  // 🔹 Send message to OpenAI
  const sendMessageText = async (text: string, image?: string) => {
    if (!text.trim() && !image) return;

    pushMessage({ sender: "user", text, image });
    setIsLoading(true);

    const lang = (document.getElementById("langSelect") as HTMLSelectElement)?.value || "en";

    try {
      const res = await fetch(OPENAI_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // 🔹 better for text + vision
          messages: [
            {
              role: "system",
              content: `You are a helpful agriculture assistant in India. Always reply in ${
                lang === "en" ? "English" : lang === "hi" ? "Hindi" : "Marathi"
              }.`,
            },
            { role: "user", content: text || "Please analyze this image." },
          ],
          // 👇 if image is uploaded, send it
          ...(image
            ? {
                modalities: ["text", "image"],
                messages: [
                  {
                    role: "user",
                    content: [
                      { type: "text", text: text || "Please analyze this image." },
                      { type: "image_url", image_url: { url: image } },
                    ],
                  },
                ],
              }
            : {}),
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
      speak(reply, lang); // 🔊 speak reply
    } catch (err) {
      console.error(err);
      pushMessage({ sender: "assistant", text: "⚠️ Error contacting OpenAI." });
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Handle send
  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;
    const text = input;
    setInput("");
    await sendMessageText(text);
  };

  // 🔹 Suggestions
  const handleSuggestion = (text: string) => {
    sendMessageText(text);
  };

  // 🔹 Voice input
  const handleMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    const lang = (document.getElementById("langSelect") as HTMLSelectElement)?.value || "en";
    recognition.lang = lang === "hi" ? "hi-IN" : lang === "mr" ? "mr-IN" : "en-IN";

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessageText(transcript);
    };
    recognition.start();
  };

  // 🔹 Image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      sendMessageText("Analyze this image", imgURL);
    }
  };

  return (
    <main className="app">
      <header className="app-header">
        <a className="back" href="#">← Back to Dashboard</a>
        <div className="title">
          <div className="logo">🌿</div>
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
                <div className="bubble" style={{ whiteSpace: "pre-wrap" }}>
                  {msg.text}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="uploaded"
                      style={{ maxWidth: "150px", borderRadius: "8px", display: "block", marginTop: "5px" }}
                    />
                  )}
                </div>
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
          <input type="file" id="imgUpload" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
          <button type="button" onClick={() => document.getElementById("imgUpload")?.click()}>📷</button>
          <button type="button" id="micBtn" onClick={handleMic}>🎤</button>
          <button type="submit" id="sendBtn">➤</button>
        </form>
      </section>
    </main>
  );
};

export default ChatbotPage;
