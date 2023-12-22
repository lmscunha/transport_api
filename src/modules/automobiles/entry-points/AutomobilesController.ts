import { Request, Response } from "express";

type Automobile = {
  licensePlate: String;
  color: String;
  brand: String;
};

const db: Automobile[] = [];

export default class AutomobileController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { automobile } = req.body;

    db.push(automobile);

    const autoCreated = db.filter(
      (auto) => auto.licensePlate == automobile.licensePlate,
    );
    const result = autoCreated[0];

    return res.status(201).json({ result });
  }
}
