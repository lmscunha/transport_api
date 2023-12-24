import { Router } from "express";

import automobilesRouter from "../modules/automobiles/entry-points/automobiles.router";
import driversRouter from "../modules/drivers/entry-points/drivers.router";

const routes = Router();
routes.use("/automobiles", automobilesRouter);
routes.use("/drivers", driversRouter);

routes.use("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to Transport API." });
});

export default routes;
