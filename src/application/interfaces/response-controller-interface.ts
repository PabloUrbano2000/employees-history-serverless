import { StatusCodes } from "http-status-codes";
import { IHistory, ISalaryHistory } from "./historico-interface";

export interface IResponseApi {
  statusCode: StatusCodes;
  success: boolean;
  data: any;
  message: string;
}

export interface IResponseBody {
  data?: any;
  message?: string;
}

export interface IHistoryMethod {
  getEmployeeHistory: (employeeId: number) => Promise<IHistory[]>;
  saveEmployeeHistory: (
    employeeId: number,
    salaries: ISalaryHistory
  ) => Promise<void>;
}

export interface IHistoryApi {
  getEmployeeHistory: (employeeId: number) => Promise<IResponseApi>;
  saveEmployeeHistory: (
    employeeId: number,
    salaries: ISalaryHistory
  ) => Promise<IResponseApi>;
}
