import logo from "./logo.svg";
import "./App.css";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/Aboutpage";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/" className="nav-item">
          Homepage
        </Link>
        <Link to="/about" className="nav-item">
          About Albert's List
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/about" element={<Aboutpage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
