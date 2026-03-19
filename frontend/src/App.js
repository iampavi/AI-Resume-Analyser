import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AuthProvider } from "./context/AuthContext";

import AuthModal from "./components/AuthModal";

import HomePage from "./pages/HomePage";
import ResultPage from "./pages/ResultPage";

import "./App.css";

function App() {

  const [result, setResult] = useState(null);

  return (

    <AuthProvider>

      <BrowserRouter>

        {/* Navbar always visible */}
       

        {/* Auth Modal */}
        <AuthModal />

        <Routes>

          <Route
            path="/"
            element={
              <HomePage
                result={result}
                setResult={setResult}
              />
            }
          />

          <Route
            path="/result"
            element={<ResultPage />}
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>

  );
}

export default App;