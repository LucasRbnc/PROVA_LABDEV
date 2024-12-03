import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NovaReserva from "./pages/NovaReserva";
import AtualizarReserva from "./pages/AtualizarReserva";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nova" element={<NovaReserva />} />
        <Route path="/atualizar/:id" element={<AtualizarReserva />} />
      </Routes>
    </Router>
  );
};

export default App;
