import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

interface ReservaFormProps {
  reserva?: any;
  onSuccess: () => void;
}

const ReservaForm: React.FC<ReservaFormProps> = ({ reserva }) => {
  const [nomecliente, setNomeCliente] = useState(reserva?.nomecliente || "");
  const [nummesa, setNumMesa] = useState(reserva?.nummesa || "");
  const [date, setDate] = useState(reserva?.date || "");
  const [contatoCliente, setContatoCliente] = useState(reserva?.contatoCliente || "");
  const [error, setError] = useState<string | null>(null); // Estado para o erro
  const navigate = useNavigate();

  const formatTelefone = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    if (onlyNumbers.length <= 2) {
      return `(${onlyNumbers}`;
    }
    if (onlyNumbers.length <= 7) {
      return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`;
    }
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7, 11)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Verificar se a data é no passado
    const reservationDate = new Date(date);
    const currentDate = new Date();
    if (reservationDate < currentDate) {
      setError("Você não pode reservar para uma data no passado.");
      return;
    }

    if (reservationDate.getFullYear() > currentDate.getFullYear() + 4) {
      setError("Você não pode fazer reservas para mais de 4 anos no futuro.");
      return;
    }
  
    try {
      const contatoClienteSemFormatacao = contatoCliente.replace(/\D/g, "");
  
      if (reserva) {
        await api.put(`/${reserva._id}`, { nomecliente, nummesa, date, contatoCliente: contatoClienteSemFormatacao });
      } else {
        await api.post("/", { nomecliente, nummesa, date, contatoCliente: contatoClienteSemFormatacao });
      }
      alert("Reserva salva com sucesso!");
      navigate("/");
    } catch (error: any) {
      console.error("Erro ao salvar a reserva:", error);
      if (error.response && error.response.data.error) {
        setError(error.response.data.error); // Atualiza o estado de erro com a mensagem recebida do backend
      } else {
        setError("Erro ao salvar a reserva.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nome do Cliente</label>
        <input
          type="text"
          value={nomecliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Número da Mesa</label>
        <input
          type="number"
          value={nummesa}
          onChange={(e) => setNumMesa(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contato do Cliente</label>
        <input
          type="text"
          value={formatTelefone(contatoCliente)}
          onChange={(e) => setContatoCliente(e.target.value)}
          required
        />
      </div>
      <button type="submit">{reserva ? "Atualizar" : "Criar"} Reserva</button>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Exibe o erro, se houver */}
    </form>
  );
};

export default ReservaForm;
