import React from "react";
import ReservaForm from "../components/ReservaForm";

const NovaReserva: React.FC = () => {
  return (
    <div className="container">
      <h1>Nova Reserva</h1>
      <ReservaForm onSuccess={() => alert("Reserva criada com sucesso!")} />
    </div>
  );
};

export default NovaReserva;
