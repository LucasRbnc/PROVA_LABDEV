import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import ReservaForm from "../components/ReservaForm";

const AtualizarReserva: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Aqui 'id' será o número da mesa
  const [reserva, setReserva] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await api.get(`/mesa/${id}`); // Busca pela mesa
        if (response.data.length > 0) {
          setReserva(response.data[0]); // Assume que há uma única reserva para a mesa
        } else {
          alert("Nenhuma reserva encontrada para esta mesa.");
          navigate("/"); // Redireciona para a Home se não encontrar a reserva
        }
      } catch (error) {
        console.error("Erro ao carregar reserva:", error);
        alert("Erro ao carregar a reserva.");
        navigate("/"); // Redireciona para a Home em caso de erro
      }
    };

    if (id) {
      fetchReserva();
    }
  }, [id, navigate]);

  return (
    <div className="container">
      <h1>Atualizar Reserva</h1>
      {reserva ? (
        <ReservaForm reserva={reserva} onSuccess={function (): void {
                  throw new Error("Function not implemented.");
              } } />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default AtualizarReserva;
