import { useState } from "react";
import { loginUser } from "../api";

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await loginUser({
        email,
        password
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("email", email);

      alert("Login successful");

      window.location.reload();

    } catch (err) {

      alert("Login failed");

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

    </form>

  );
}

export default LoginForm;