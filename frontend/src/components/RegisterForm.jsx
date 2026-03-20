import { useState, useContext } from "react";
import { registerUser, loginUser } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function RegisterForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault(); // 🔥 IMPORTANT (prevent page reload)

    try {
      // ✅ Register first
      await registerUser({ email, password });

      // ✅ Auto login after register
      const res = await loginUser({ email, password });

      // 🔥 Update global auth state
      login(res.email, res.token);

    } catch (err) {
      alert(err.message);
    }
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

      <button type="submit" className="primaryBtn">
        Register
      </button>

    </form>

  );
}