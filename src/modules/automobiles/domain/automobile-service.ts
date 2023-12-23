import { AutomobileUseCases } from "./automobile-use-cases";
import { Automobile } from "./AutomobileModel";
import { AutomobileProvider } from "./automobile-protocols";
import { ResultDTO, FilterDTO, InputDTO } from "./automobile-dtos";

export class AutomobileService implements AutomobileUseCases {
  constructor(public readonly automobileProvider: AutomobileProvider) {}

  public async getAllAutomobiles(params: FilterDTO): Promise<ResultDTO> {
    let automobiles: Automobile[];

    if (Object.keys(params).length > 0) {
      automobiles = await this.automobileProvider.filterBy(params);
      return { ok: true, automobile: automobiles };
    }

    automobiles = await this.automobileProvider.getAll();
    return { ok: true, automobile: automobiles };
  }

  public async getAnAutomobile(id: string): Promise<ResultDTO> {
    const automobile = await this.automobileProvider.getById(id);

    if (!automobile) {
      return {
        ok: false,
        why: "no-automobile-found",
        status: 404,
      };
    }

    return { ok: true, automobile };
  }

  public async registerAutomobile(automobile: InputDTO): Promise<ResultDTO> {
    const { licensePlate, color, brand } = automobile;

    if (!licensePlate || !color || !brand) {
      return { ok: false, why: "invalid-automobile-data", status: 403 };
    }

    const licensePlateValidator = new RegExp(
      "^[A-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$",
    );
    const test = licensePlateValidator.test(licensePlate.toUpperCase());
    const validPlate = await this.automobileProvider.isValidPlate(licensePlate);

    if (!test || !validPlate) {
      return { ok: false, why: "invalid-license-plate", status: 403 };
    }

    const result = await this.automobileProvider.save({
      licensePlate,
      color,
      brand,
    });
    return { ok: true, automobile: result };
  }

  public async updateAutomobile(
    id: string,
    newData: InputDTO,
  ): Promise<ResultDTO> {
    if (Object.keys(newData).length < 1) {
      return { ok: false, why: "no-data-to-update", status: 403 };
    }

    const automobile = await this.automobileProvider.update(id, newData);
    if (!automobile) {
      return {
        ok: false,
        why: "no-automobile-found",
        status: 404,
      };
    }

    return { ok: true, automobile };
  }

  public async deleteAutomobile(id: string): Promise<void | ResultDTO> {
    if (!id) {
      return { ok: false, why: "invalid-id", status: 403 };
    }

    await this.automobileProvider.delete(id);
  }
}
