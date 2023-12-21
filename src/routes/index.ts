import { Router } from "express";

const routes = Router();

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
