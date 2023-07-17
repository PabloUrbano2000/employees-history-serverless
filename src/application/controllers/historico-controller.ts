import HistoricoUseCase from "src/domain/usecase/historico-usecase";
import { responseFail, responseSuccess } from "../helpers/response";
import {
  IHistoryApi,
  IHistoryMethod,
  IResponseApi,
} from "../interfaces/response-controller-interface";
import { StatusCodes } from "http-status-codes";
import { ISalaryHistory } from "../interfaces/historico-interface";

class HistoryController implements IHistoryApi {
  private historicoUC: IHistoryMethod;

  constructor() {
    this.historicoUC = new HistoricoUseCase();
  }

  getEmployeeHistory = async (employeeId: number) => {
    let response: IResponseApi;

    try {
      const result = await this.historicoUC.getEmployeeHistory(employeeId);
      response = responseSuccess({ data: result }, StatusCodes.OK);
    } catch (error) {
      response = responseFail(error);
    }

    return response;
  };

  saveEmployeeHistory = async (
    employeeId: number,
    salaries: ISalaryHistory
  ) => {
    let response: IResponseApi;
    try {
      await this.historicoUC.saveEmployeeHistory(employeeId, salaries);
      response = responseSuccess(
        { message: "Histórico almacenado" },
        StatusCodes.OK
      );
    } catch (error) {
      response = responseFail(error);
    }
    return response;
  };
}

export default HistoryController;
