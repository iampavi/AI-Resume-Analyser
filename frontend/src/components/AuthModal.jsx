import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthModal() {

  const { authType, setAuthType } = useContext(AuthContext);

  if (!authType) return null;

  return (

    <div className="modalOverlay">

      <div className="modalBox">

        <button
          className="closeBtn"
          onClick={() => setAuthType(null)}
        >
          ✕
        </button>

        {authType === "login" && <LoginForm />}
        {authType === "register" && <RegisterForm />}

      </div>

    </div>
  );
}

export default AuthModal;