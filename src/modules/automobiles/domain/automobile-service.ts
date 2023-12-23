import { AutomobileUseCases } from "./automobile-use-cases";
import { Automobile } from "./AutomobileModel";
import { AutomobileProvider } from "./automobile-protocols";
import { FilterDTO, InputDTO } from "./automobile-dtos";

export class AutomobileService implements AutomobileUseCases {
  constructor(public readonly automobileProvider: AutomobileProvider) {}

  public async getAllAutomobiles(
    params: FilterDTO,
  ): Promise<Automobile[] | []> {
    let automobiles: Automobile[];

    if (Object.keys(params).length > 0) {
      automobiles = await this.automobileProvider.filterBy(params);
      return automobiles;
    }

    automobiles = await this.automobileProvider.getAll();
    return automobiles;
  }

  public async getAnAutomobile(id: string): Promise<Automobile | null> {
    const automobile = await this.automobileProvider.getById(id);

    if (!automobile) {
      return null;
    }

    return automobile;
  }

  public async registerAutomobile(automobile: InputDTO): Promise<Automobile> {
    // const licensePlateValidator = new RegExp("^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$")
    // if (!licensePlateValidator.test(licensePlate)) {
    //   throw new Error("Invalid licensePlate.")
    // }
    const { licensePlate, color, brand } = automobile;

    if (!licensePlate || !color || !brand) {
      throw new Error("Invalid automobile data.");
    }

    return this.automobileProvider.save({ licensePlate, color, brand });
  }

  public async updateAutomobile(
    id: string,
    newData: InputDTO,
  ): Promise<Automobile> {
    const { licensePlate, color, brand } = newData;

    if (!licensePlate && !color && !brand) {
      throw new Error("Nothing to update.");
    }

    const automobile = await this.automobileProvider.update(id, newData);
    if (!automobile) {
      throw new Error("Invalid automobile identifier.");
    }
    return automobile;
  }

  public async deleteAutomobile(id: string): Promise<void> {
    await this.automobileProvider.delete(id);
  }
}
