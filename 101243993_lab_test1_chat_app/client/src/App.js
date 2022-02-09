import "./App.css";
import Registration from "./Registration/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Room from "./Rooms/Room";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
