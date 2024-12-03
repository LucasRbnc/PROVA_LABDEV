import { Router } from "express";
import expenses from "./reserva"

const routes = Router()

routes.use("/reservas/", expenses);

export default routes