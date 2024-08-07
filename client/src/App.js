import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/LoginUser";
import SignUp from "./pages/SignUpUser";
import Profile from "pages/ProfileUser";
import UserPassword from "pages/ProfileUserPassword";
import PartnerLogin from "pages/LoginPartner";
import PartnerSignUp from "pages/SignUpPartner";
import PartnerProfile from "pages/ProfilePartner";
import ManageBookings from "pages/ManageBookings";
import Search from "pages/Search";
import Calendar from "pages/BookingCalendar";
import Business from "pages/Business";
import BusinessLanding from "pages/BusinessLanding";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import { SearchProvider } from "./SearchContext";
import { BusinessProvider } from "BusinessContext";
import PartnerServices from "pages/PartnerServices";

function App() {
  return (
    <div>
      <SearchProvider>
        <BusinessProvider>
          <UserProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/profile" element={<Profile />}></Route>
                <Route path="/userpassword" element={<UserPassword />}></Route>
                <Route path="/partnerlogin" element={<PartnerLogin />}></Route>
                <Route
                  path="/partnersignup"
                  element={<PartnerSignUp />}
                ></Route>
                <Route
                  path="/partnerprofile"
                  element={<PartnerProfile />}
                ></Route>
                <Route path="/search" element={<Search />}></Route>
                <Route path="/business" element={<Business />}></Route>
                <Route path="/calendar" element={<Calendar />}></Route>
                <Route
                  path="/manage-bookings"
                  element={<ManageBookings />}
                ></Route>
                <Route
                  path="/partnerservices"
                  element={<PartnerServices />}
                ></Route>
                <Route path="/landing" element={<BusinessLanding />}></Route>
              </Routes>
            </Router>
          </UserProvider>
        </BusinessProvider>
      </SearchProvider>
    </div>
  );
}

export default App;
