import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Home from "./pages/home";
import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/login";
import ProfilePage from "./pages/profile";
import useCurrentLocation from "./utils/currentLocation";
import MyPlan from "./pages/my-plan";

function App() {
  const [user, setUser] = useState(null);
  const { location, error } = useCurrentLocation();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <Routes>
          {user ? (<>
            <Route path="/" element={<Home location={location} />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/my-plan" element={<MyPlan user={user} location={location} />} />
          </>) : (<>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
          </>)}
        </Routes>
      </div>
    </Router >
  );
}

export default App;