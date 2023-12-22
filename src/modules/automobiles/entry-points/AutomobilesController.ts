import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

type Automobile = {
  id: String;
  licensePlate: String;
  color: String;
  brand: String;
};

const db: Automobile[] = [];

export default class AutomobileController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { automobile } = req.body;
    const id = uuidv4();

    automobile.id = id;
    db.push(automobile);

    const autoCreated = db.filter((auto) => auto.id == id);

    const result = autoCreated[0];

    return res.status(201).json({ result });
  }
}
