import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Tournaments from "./pages/Tournaments";
import Teams from "./pages/Teams";
import FreeAgents from "./pages/FreeAgents";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/tournaments"
          element={<Tournaments />}
        />

        <Route
          path="/teams"
          element={<Teams />}
        />

        <Route
          path="/free-agents"
          element={<FreeAgents />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;