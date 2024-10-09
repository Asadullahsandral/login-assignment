import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Userinfo from "./components/Userinfo";
import Users from "./components/Users";
import Report from "./components/Report";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Userinfo />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
