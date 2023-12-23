import { Automobile } from "./AutomobileModel";
import { InputDTO, FilterDTO } from "./automobile-dtos";

export interface AutomobileUseCases {
  getAllAutomobiles: (params: FilterDTO) => Promise<Automobile[] | []>;
  getAnAutomobile: (id: string) => Promise<Automobile | null>;
  registerAutomobile: (autombile: InputDTO) => Promise<Automobile>;
  updateAutomobile: (id: string, automobile: InputDTO) => Promise<Automobile>;
  deleteAutomobile: (id: string) => Promise<void>;
}
