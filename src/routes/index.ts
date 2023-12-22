import { Router } from "express";

import automobilesRouter from "../modules/automobiles/routes/automobiles.router";

const routes = Router();
routes.use("/automobiles", automobilesRouter);

routes.use("/", async (req, res) => {
  try {
    res.status(200).send("Welcome to Transport API.");
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong. Please return later." });
  }
});

export default routes;
