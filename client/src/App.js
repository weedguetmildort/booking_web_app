import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import ProfilePage from "pages/Profile";
import PartnerLogin from "pages/PartnerLogin";
import PartnerSignUp from "pages/PartnerSignUp";
import PartnerProfilePage from "pages/PartnerProfile";
import SearchPage from "pages/Search";
import CallBackPage from "pages/Callback";
import { Routes, Route } from "react-router-dom";
import Calendar from "pages/BookingCalendar";
import ManageBookings from "pages/ManageBookings";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/partner-login" element={<PartnerLogin />}></Route>
        <Route path="/partner-signup" element={<PartnerSignUp />}></Route>
        <Route path="/partner-profile" element={<PartnerProfilePage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/callback" element={<CallBackPage />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/manage-bookings" element={<ManageBookings/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
