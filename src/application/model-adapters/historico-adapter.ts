import HistoricoQuery from "src/infraestruture/repositories/historico-query";
import { IHistoryMethod } from "../interfaces/response-controller-interface";
import { ISalaryHistory } from "../interfaces/historico-interface";
import { IHistoryQuery } from "src/infraestruture/interfaces/response-query-interface";

class HistoricoAdapter implements IHistoryMethod {
  private historyQuery: IHistoryQuery;

  constructor() {
    this.historyQuery = new HistoricoQuery();
  }

  public async getEmployeeHistory(employeeId: number) {
    const query = await this.historyQuery.getEmployeeHistory(employeeId);

    if (!query.Item) {
      return null;
    }

    return query.Item.history.L.map((item) => {
      const { updateDate, previousSalary, newSalary } = item.M;
      return {
        updateDate: new Date(updateDate.S),
        previousSalary: +previousSalary.N,
        newSalary: +newSalary.N,
      };
    });
  }

  public async saveEmployeeHistory(
    employeeId: number,
    salaries: ISalaryHistory
  ): Promise<void> {
    await this.historyQuery.saveEmployeeHistory(employeeId, salaries);
  }
}

export default HistoricoAdapter;
