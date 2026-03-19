const BASE_URL = "https://localhost:7137/api";

export const analyzeResume = async (file, role) => {

  const formData = new FormData();
  formData.append("file", file);
  formData.append("role", role);

  const response = await fetch(`${BASE_URL}/resume/analyze`, {
    method: "POST",
    body: formData
  });

  return response.json();
};


export const registerUser = async (data) => {

  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
};


export const loginUser = async (data) => {

  const response = await fetch("https://localhost:7137/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const result = await response.json();

  localStorage.setItem("token", result.token);

  return result;
};