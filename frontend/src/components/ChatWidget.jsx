import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState({ x: 20, y: 90 });
    const dragging = useRef(false);
    const offset = useRef({ x: 0, y: 0 });
    const messagesEndRef = useRef(null);
    const [maximized, setMaximized] = useState(false);

    // 🔥 Auto scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("https://localhost:7137/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(input)
            });

            const reply = await res.text();

            const botMsg = { role: "assistant", content: reply };

            setMessages(prev => [...prev, botMsg]);
        } catch {
            setMessages(prev => [
                ...prev,
                { role: "assistant", content: "Something went wrong." }
            ]);
        }

        setLoading(false);
    };

    useEffect(() => {
        setMessages([
            { role: "assistant", content: "Hi! I analyzed your resume. Ask me anything." }
        ]);
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);
    const handleMouseDown = (e) => {
        dragging.current = true;

        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMouseMove = (e) => {
        if (!dragging.current) return;

        setPosition({
            x: e.clientX - offset.current.x,
            y: e.clientY - offset.current.y
        });
    };

    const handleMouseUp = () => {
        dragging.current = false;
    };

    return (
        <>
            {/* 💬 Floating Button */}
            <div
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    width: "60px",
                    height: "60px",
                    background: "#4CAF50",
                    color: "white",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    cursor: "pointer",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    zIndex: 999
                }}
            >
                💬
            </div>

            {/* 🧠 Chat Box */}
            {open && (
                <div
                    style={{
  position: "fixed",
  top: maximized ? 0 : position.y,
  left: maximized ? 0 : position.x,
  width: maximized ? "100vw" : "340px",
  height: maximized ? "100vh" : "480px",
  background: "#fff",
  borderRadius: maximized ? "0px" : "12px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  zIndex: 999,
 
                    }}
                >
                    {/* Header */}
                  <div
  onMouseDown={!maximized ? handleMouseDown : null}
  style={{
    background: "#4CAF50",
    color: "white",
    padding: "12px",
    fontWeight: "bold",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: maximized ? "default" : "grab"
  }}
>
  <span>Resume AI Assistant</span>

  <div style={{ display: "flex", gap: "10px" }}>
    
    {/* 🔲 Maximize */}
    <span
      onClick={() => setMaximized(!maximized)}
      style={{ cursor: "pointer" }}
    >
      {maximized ? "🗗" : "🗖"}
    </span>

    {/* ❌ Close */}
    <span
      onClick={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      style={{ cursor: "pointer" }}
    >
      ✕
    </span>
  </div>
</div>

                    {/* Messages */}
                    <div
                        style={{
                            flex: 1,
                            padding: "10px",
                            overflowY: "auto",
                            background: "#f9f9f9"
                        }}
                    >
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        m.role === "user" ? "flex-end" : "flex-start",
                                    marginBottom: "8px"
                                }}
                            >
                                <div
                                    style={{
                                        maxWidth: "75%",
                                        padding: "8px 12px",
                                        borderRadius: "12px",
                                        background:
                                            m.role === "user" ? "#DCF8C6" : "#ffffff",
                                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                                    }}
                                >
                                    <ReactMarkdown>{m.content}</ReactMarkdown>
                                </div>
                            </div>
                        ))}

                        {/* 🔥 Typing Indicator */}
                        {loading && (
                            <div style={{ fontStyle: "italic", fontSize: "12px" }}>
                                AI is typing...
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div
                        style={{
                            display: "flex",
                            borderTop: "1px solid #ddd"
                        }}
                    >
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Ask about your resume..."
                            style={{
                                flex: 1,
                                border: "none",
                                padding: "10px",
                                outline: "none"
                            }}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                background: "#4CAF50",
                                color: "white",
                                border: "none",
                                padding: "10px 15px",
                                cursor: "pointer"
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}