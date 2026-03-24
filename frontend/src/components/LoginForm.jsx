import { useState, useContext } from "react";
import { loginUser } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {
  const { login, setAuthType } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      login(res.email, res.token);

      setSuccess("Login successful 🎉");

      // 🔥 close modal after 1 sec
      setTimeout(() => {
        setAuthType(null);
      }, 1000);

    } catch (err) {
      setError(err.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <form className="authForm" onSubmit={handleLogin}>
      <h2>Login</h2>

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

      {/* 🔥 ERROR MESSAGE */}
      {error && <p className="errorText">{error}</p>}

      {/* 🔥 SUCCESS MESSAGE */}
      {success && <p className="successText">{success}</p>}

      <button type="submit" className="primaryBtn" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
} 