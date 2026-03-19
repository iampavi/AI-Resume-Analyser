import { useState } from "react";
import { registerUser } from "../api";

function RegisterForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await registerUser({
        email,
        password
      });

      alert("Registration successful");

    } catch (err) {
      alert("Registration failed");
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

export default RegisterForm;