import { Request, Response } from "express";

import { AutomobileService } from "../domain/automobile-service";
import { AutomobileRepository } from "../data-access/automobile-repository";

const automobileService = new AutomobileService(new AutomobileRepository());

export default class AutomobileController {
  public async list(req: Request, res: Response): Promise<Response> {
    const query = req.query;
    let automobiles = await automobileService.getAllAutomobiles(query);

    return res.status(200).json({ automobiles });
  }

  public async load(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const automobile = await automobileService.getAnAutomobile(id);
    if (!automobile) {
      return res.status(404).json({ message: "Automobile not found." });
    }

    return res.status(200).json({ automobile });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { licensePlate, color, brand } = req.body;

    const automobile = await automobileService.registerAutomobile({
      licensePlate,
      color,
      brand,
    });
    return res.status(201).json({ automobile });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const body = req.body;

    const automobile = await automobileService.updateAutomobile(id, body);
    return res.status(200).json({ automobile });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await automobileService.deleteAutomobile(id);

    return res.status(204).json();
  }
}
