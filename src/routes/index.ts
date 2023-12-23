import { Router } from "express";

import automobilesRouter from "../modules/automobiles/entry-points/automobiles.router";

const routes = Router();
routes.use("/automobiles", automobilesRouter);

routes.use("/", async (req, res) => {
  res.status(200).json({ message: "Welcome to Transport API." });
});

export default routes;
