import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { ISalaryHistory } from "src/application/interfaces/historico-interface";

export interface IHistoryQuery {
  getEmployeeHistory: (employeeId: number) => Promise<GetItemCommandOutput>;
  saveEmployeeHistory: (
    employeeId: number,
    salaries: ISalaryHistory
  ) => Promise<void>;
}
