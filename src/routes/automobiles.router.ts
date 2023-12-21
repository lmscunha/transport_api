import { Router } from "express";

const automobilesRouter = Router();

type Automobile = {
  licensePlate: String;
  color: String;
  brand: String;
};

const db: Automobile[] = [];

automobilesRouter.post("/", async (req, res) => {
  const { automobile } = req.body;

  db.push(automobile);
  const autoCreated = db.filter(
    (auto) => auto.licensePlate == automobile.licensePlate,
  );
  const result = autoCreated[0];

  return res.status(201).json({ result });
});

export default automobilesRouter;
