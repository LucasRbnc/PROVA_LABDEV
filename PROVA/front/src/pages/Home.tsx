import React from "react";
import { Link } from "react-router-dom";
import ReservaList from "../components/ReservaList";

const Home: React.FC = () => {
  return (
    <div className="container">
      <h1>Gerenciamento de Reservas</h1>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/nova">
          <button>Nova Reserva</button>
        </Link>
      </div>
      <ReservaList />
    </div>
  );
};

export default Home;
