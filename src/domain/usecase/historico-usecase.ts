import { StatusCodes } from "http-status-codes";
import HttpError from "src/application/exceptions/http-error";
import { ISalaryHistory } from "src/application/interfaces/historico-interface";
import { IHistoryMethod } from "src/application/interfaces/response-controller-interface";
import HistoricoAdapter from "src/application/model-adapters/historico-adapter";

export default class HistoricoUseCase implements IHistoryMethod {
  private historyAdapter: IHistoryMethod;

  constructor() {
    this.historyAdapter = new HistoricoAdapter();
  }

  public async getEmployeeHistory(employeeId: number) {
    const result = await this.historyAdapter.getEmployeeHistory(employeeId);

    if (result === null || result.length === 0) {
      throw new HttpError(
        "El historico del empleado noe existe",
        StatusCodes.NOT_FOUND
      );
    }

    return result;
  }

  public async saveEmployeeHistory(
    employeeId: number,
    salaries: ISalaryHistory
  ): Promise<void> {
    await this.historyAdapter.saveEmployeeHistory(employeeId, salaries);
  }
}
