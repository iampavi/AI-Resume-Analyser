import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { registerUser,loginUser } from "../api";

export default function RegisterForm() {
  
  const { setAuthType, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

const handleRegister = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");
  setSuccess("");

  try {
    // ✅ 1. Register
    await registerUser({ email, password });

    // ✅ 2. Auto login (THIS WAS MISSING ❗)
    const res = await loginUser({ email, password });

    // ✅ 3. Update React state (VERY IMPORTANT)
    login(res.email, res.token);

    setSuccess("Account created successfully 🎉");

    // ✅ 4. Close modal after delay
    setTimeout(() => {
      setAuthType(null);
    }, 1000);

  } catch (err) {
    setError(err.message);
  }

  setLoading(false);
};
  return (
    <form className="authForm" onSubmit={handleRegister}>
      <h2>Create Account</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
      />

      {/* 🔥 ERROR */}
      {error && <p className="errorText">{error}</p>}

      {/* 🔥 SUCCESS */}
      {success && <p className="successText">{success}</p>}

      <button type="submit" className="primaryBtn" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}