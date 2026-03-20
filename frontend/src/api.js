// api.js

const BASE_URL = process.env.REACT_APP_API_URL  || "https://ai-resume-analyser-l5qu.onrender.com";

export const registerUser = async (data) => {

  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // 🔥 FIX: handle text instead of JSON
  const text = await response.text();

  if (!response.ok) {
    throw new Error(text || "Registration failed");
  }

  return text; // or just return true
};

// 🔐 LOGIN
export const loginUser = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text);
    }

    const result = JSON.parse(text);

    // 🔥 STORE TOKEN + EMAIL
    localStorage.setItem("token", result.token);
    localStorage.setItem("email", result.email);

    return result;

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    throw err;
  }
};

// 📄 ANALYZE RESUME
export const analyzeResume = async (file, role) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("role", role);

  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/resume/analyze`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  return response.json();
};

// 🤖 CHAT
export const sendChatMessage = async (message) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ message }) // ✅ FIX HERE
  });

  if (!response.ok) {
    throw new Error("Chat failed");
  }

  return response.text();
};