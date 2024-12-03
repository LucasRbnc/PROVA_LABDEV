import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const ReservaList: React.FC = () => {
  const [reservas, setReservas] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchReservas = async () => {
    try {
      const response = await api.get("/");
      setReservas(response.data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/${id}`); 
      setReservas((prevReservas) => prevReservas.filter((reserva) => reserva._id !== id)); // Remove a reserva deletada da lista
      alert("Reserva excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir reserva:", error);
      alert("Erro ao excluir reserva.");
    }
  };
  
  const handleEdit = (nummesa: number) => {
    navigate(`/atualizar/${nummesa}`); 
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  return (
    <div>
      <h2>Reservas</h2>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva._id}>
            {reserva.nomecliente} - Mesa {reserva.nummesa} - {reserva.date}
            <button onClick={() => handleDelete(reserva._id)}>Excluir</button>
            <button onClick={() => handleEdit(reserva.nummesa)} className="secondary">Atualizar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservaList;
