import { Router } from "express";
import controller from "../controllers/RestaurantController";

const routes = Router();

routes.post("/", controller.createReserva);
routes.get("/", controller.listReservas);
routes.get("/cliente/:nomecliente", controller.listReservasPorCliente);
routes.get("/mesa/:nummesa", controller.listReservasPorMesa);
routes.put("/:id", controller.updateReserva);
routes.delete("/:id", controller.deleteReserva)

export default routes;