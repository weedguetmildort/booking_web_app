import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/LoginUser";
import SignUpPage from "./pages/SignUpUser";
import ProfilePage from "pages/ProfileUser";
import UserPasswordPage from "pages/ProfileUserPassword";
import PartnerLogin from "pages/LoginPartner";
import PartnerSignUp from "pages/SignUpPartner";
import PartnerProfilePage from "pages/ProfilePartner";
import SearchPage from "pages/Search";

import CallBackPage from "pages/Callback";
import { Routes, Route } from "react-router-dom";
import Calendar from "pages/BookingCalendar";

import Business from "pages/Business";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";


function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/about" element={<AboutPage />}></Route>
            <Route path="/contact" element={<ContactPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/userpassword" element={<UserPasswordPage />}></Route>
            <Route path="/partnerlogin" element={<PartnerLogin />}></Route>
            <Route path="/partnersignup" element={<PartnerSignUp />}></Route>
            <Route
              path="/partnerprofile"
              element={<PartnerProfilePage />}
            ></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/business" element={<Business />}></Route>
            <Route path="/calendar" element={<Calendar />}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
