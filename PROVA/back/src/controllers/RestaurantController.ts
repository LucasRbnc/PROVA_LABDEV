import { Request, Response } from "express";
import Restaurant from "../models/Restaurant";

class RestaurantController{
    public async createReserva (req: Request, res: Response){
        try {
            console.log("Recebendo dados:", req.body); 
            const { nomecliente, nummesa, date, status, contatoCliente } = req.body;
        
            if (!date) {
              return res.status(400).json({ error: "A data  é obrigatória." });
            }
        
            const dateParts = date.split("-");
            const formattedDate = new Date(
              parseInt(dateParts[0]),
              parseInt(dateParts[1]) - 1,
              parseInt(dateParts[2])
            );
            
            const currentDate = new Date();
            if (formattedDate < currentDate) {
              return res.status(400).json({ error: "Você não pode reservar para uma data no passado." });
            }
        
            const currentYear = new Date().getFullYear();
            const reservationYear = formattedDate.getFullYear();
            if (reservationYear > currentYear + 4) {
              return res.status(400).json({ error: "Você não pode fazer reservas para mais de 4 anos no futuro." });
            }

            const mesaReservada = await Restaurant.findOne({ nummesa });
            if (mesaReservada) {
              return res.status(400).json({ error: "Essa mesa já foi reservada!" });
            }
        
            const newReserva = new Restaurant({
              nomecliente, 
              nummesa, 
              status, 
              contatoCliente,
              date: formattedDate,
            });
        
            await newReserva.save();
            console.log("Reserva feita com sucesso:", newReserva);
            res.status(201).json(newReserva);
          } catch (error) {
            console.error("Erro ao criar reserva:", error);
            res.status(500).json({ error: "Erro ao criar reserva." });
          }
        };
    //Lista geral
    public async listReservas(req: Request, res: Response): Promise<Response> {
        try {
        const reservas = await Restaurant.find();
        if (reservas.length === 0) {
            return res.status(404).json({ message: "Nenhuma reserva encontrada." });
        }
        return res.status(200).json(reservas);
        } catch (error) {
        console.error("Erro ao listar reservas:", error);
        return res.status(500).json({ error: "Erro ao listar reservas." });
        }
    };
    //Lista por cliente
    public async listReservasPorCliente(req: Request, res: Response): Promise<Response> {
        const { nomecliente } = req.params;
        try {
          const reservas = await Restaurant.find({ nomecliente });
          if (reservas.length === 0) {
            return res.status(404).json({ message: `Nenhuma reserva encontrada para o cliente ${nomecliente}` });
          }
          return res.status(200).json(reservas);
        } catch (error) {
          console.error("Erro ao listar reservas por cliente:", error);
          return res.status(500).json({ error: "Erro ao listar reservas por cliente." });
        }
    };
    //Lista por mesa
    public async listReservasPorMesa(req: Request, res: Response): Promise<Response> {
        const { nummesa } = req.params;
        try {
          const reservas = await Restaurant.find({ nummesa });
          if (reservas.length === 0) {
            return res.status(404).json({ message: `Nenhuma reserva encontrada para a mesa ${nummesa}` });
          }
          return res.status(200).json(reservas);
        } catch (error) {
          console.error("Erro ao listar reservas por mesa:", error);
          return res.status(500).json({ error: "Erro ao listar reservas por mesa." });
        }
    };
    //Att Reserva
    public async updateReserva(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { nomecliente, nummesa, date, status, contatoCliente } = req.body;
    
        try {
          const reservaAtualizada = await Restaurant.findByIdAndUpdate(
            id,
            { nomecliente, nummesa, date, status, contatoCliente },
            { new: true }
          );
    
          if (!reservaAtualizada) {
            return res.status(404).json({ message: "Reserva não encontrada." });
          }
    
          return res.status(200).json({ message: "Reserva atualizada com sucesso!", reserva: reservaAtualizada });
        } catch (error) {
          console.error("Erro ao atualizar reserva:", error);
          return res.status(500).json({ error: "Erro ao atualizar reserva." });
        }
    };
    //Excluir reserva
    public async deleteReserva(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
    
        try {
          const reservaDeletada = await Restaurant.findByIdAndDelete(id);
          if (!reservaDeletada) {
            return res.status(404).json({ message: "Reserva não encontrada." });
          }
          return res.status(200).json({ message: "Reserva excluída com sucesso!" });
        } catch (error) {
          console.error("Erro ao excluir reserva:", error);
          return res.status(500).json({ error: "Erro ao excluir reserva." });
        }
    }
}

export default new RestaurantController();