import { useState, useContext } from "react";
import { loginUser } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, setAuthType } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault(); // 🔥 prevent reload

    try {
      const res = await loginUser({ email, password });

      // 🔥 Update global auth state
      login(res.email, res.token);

    } catch (err) {
      alert(err.message);
    }
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

      <button type="submit" className="primaryBtn">
        Login
      </button>

      {/* 🔥 Switch to Register */}
      <p
        style={{ marginTop: "10px", cursor: "pointer", fontSize: "14px" }}
        onClick={() => setAuthType("register")}
      >
        Don’t have an account? Register
      </p>

    </form>

  );
}