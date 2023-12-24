import { v4 as uuidv4 } from "uuid";

import { AutomobileUsage } from "../domain/AutomobileUsageModel";
import { AutomobileUsageProvider } from "../domain/automobile-usage-protocols";
import { UpdateDTO, StorageDTO } from "../domain/automobile-usage-dtos";

let db: AutomobileUsage[] = [];

export class AutomobileUsageRepositoryFaker implements AutomobileUsageProvider {
  public async getAll(): Promise<AutomobileUsage[] | []> {
    const automobileUsages = db;
    return automobileUsages;
  }

  public async getById(id: string): Promise<AutomobileUsage> {
    let autoUsage = db.filter((autoUsage) => autoUsage.id === id);
    return autoUsage[0];
  }

  public async isValidDriver(driverId: string): Promise<boolean> {
    let result = false;
    let isDriverUsingAnAuto = db.filter(
      (autoUsage) => autoUsage.driver.id === driverId && !autoUsage.endDate,
    );

    if (isDriverUsingAnAuto.length < 1) {
      result = true;
    }
    return result;
  }

  public async save(automobileUsage: StorageDTO): Promise<AutomobileUsage> {
    const id = uuidv4();

    const { startDate, driver, automobile, reason } = automobileUsage;

    db.push({ id, startDate, driver, automobile, reason });
    return { id, startDate, driver, automobile, reason };
  }

  public async update(
    id: string,
    newData: UpdateDTO,
  ): Promise<AutomobileUsage | null> {
    let automobileUsage: AutomobileUsage | null = null;

    db.forEach((autoUsage) => {
      if (autoUsage.id === id) {
        autoUsage = Object.assign(autoUsage, newData);
        automobileUsage = autoUsage;
      }
    });

    return automobileUsage;
  }

  public async reset(): Promise<void> {
    db = [];
  }
}
