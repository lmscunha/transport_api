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
  public async load(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const auto = db.filter((auto) => auto.id == id);

    const automobile = auto[0];
    return res.status(200).json({ automobile });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { licensePlate, color, brand } = req.body;
    const id = uuidv4();

    db.push({ id, licensePlate, color, brand });
    const autoCreated = db.filter((auto) => auto.id == id);

    const automobile = autoCreated[0];
    return res.status(201).json({ automobile });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const body = req.body;

    const auto = db.filter((auto) => auto.id == id);

    const automobile = auto[0];
    for (const property in body) {
      if (automobile[property as keyof Automobile]) {
        automobile[property as keyof Automobile] =
          body[property as keyof Automobile];
      }
    }
    return res.status(200).json({ automobile });
  }
}
