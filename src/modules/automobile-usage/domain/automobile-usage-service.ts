import { AutomobileUsageUseCases } from "./automobile-usage-use-cases";
import { AutomobileUsageProvider } from "./automobile-usage-protocols";
import { ResultDTO, UpdateDTO, InputDTO } from "./automobile-usage-dtos";
import { AutomobileProvider } from "../../automobiles/domain/automobile-protocols";
import { DriverProvider } from "../../drivers/domain/driver-protocols";

export class AutomobileUsageService implements AutomobileUsageUseCases {
  constructor(
    public readonly automobileUageProvider: AutomobileUsageProvider,
    public readonly automobileProvider: AutomobileProvider,
    public readonly driverProvider: DriverProvider,
  ) {}

  public async getAllAutomobileUsages(): Promise<ResultDTO> {
    const automobileUsages = await this.automobileUageProvider.getAll();
    return { ok: true, automobileUsage: automobileUsages };
  }

  public async registerAutomobileUsage(
    automobileUsage: InputDTO,
  ): Promise<ResultDTO> {
    const { startDate, driverId, automobileId, reason } = automobileUsage;

    if (!startDate || !driverId || !automobileId || !reason) {
      return { ok: false, why: "invalid-automobile-usage-data", status: 403 };
    }

    const driver = await this.driverProvider.getById(driverId);
    if (!driver) {
      return {
        ok: false,
        why: "no-driver-found",
        status: 404,
      };
    }

    const isAValidDriver =
      await this.automobileUageProvider.isValidDriver(driverId);
    if (!isAValidDriver) {
      return {
        ok: false,
        why: "invalid-driver-already-has-a-usage",
        status: 403,
      };
    }

    const automobile = await this.automobileProvider.getById(automobileId);

    if (!automobile) {
      return {
        ok: false,
        why: "no-automobile-found",
        status: 404,
      };
    }

    const result = await this.automobileUageProvider.save({
      startDate,
      automobile,
      driver,
      reason,
    });

    return { ok: true, automobileUsage: result };
  }

  public async updateAutomobileUsage(
    id: string,
    newData: UpdateDTO,
  ): Promise<ResultDTO> {
    if (Object.keys(newData).length < 1) {
      return { ok: false, why: "no-data-to-update", status: 403 };
    }

    const autoUsageCreated = await this.automobileUageProvider.getById(id);
    if (!autoUsageCreated) {
      return {
        ok: false,
        why: "no-automobile-usage-found",
        status: 404,
      };
    }
    if (autoUsageCreated.startDate > newData.endDate) {
      return {
        ok: false,
        why: "no-invalid-end-update",
        status: 403,
      };
    }

    const automobileUsage = await this.automobileUageProvider.update(
      id,
      newData,
    );

    if (!automobileUsage) {
      return {
        ok: false,
        why: "no-automobile-usage-found",
        status: 404,
      };
    }
    return { ok: true, automobileUsage };
  }
}
