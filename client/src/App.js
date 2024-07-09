import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import PartnerLogin from "pages/PartnerLogin";
import PartnerSignUp from "pages/PartnerSignUp";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/partner-login" element={<PartnerLogin />}></Route>
        <Route path="/partner-signup" element={<PartnerSignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
