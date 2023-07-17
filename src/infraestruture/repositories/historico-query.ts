import {
  GetItemCommand,
  GetItemCommandInput,
  GetItemCommandOutput,
  PutItemCommand,
  PutItemCommandInput,
  AttributeValue,
} from "@aws-sdk/client-dynamodb";
import DynamoConnection from "./DynamoConnection";
import { ISalaryHistory } from "../../application/interfaces/historico-interface";
import { IHistoryQuery } from "../interfaces/response-query-interface";

const TableName = "employee-history";

class HistoricoQuery implements IHistoryQuery {
  public async getEmployeeHistory(
    employeeId: number
  ): Promise<GetItemCommandOutput> {
    // Input para Obtener objeto de DinamoDB
    const input: GetItemCommandInput = {
      TableName: TableName,
      Key: {
        employeeId: {
          N: `${employeeId}`,
        },
      },
    };

    // Conversión del objeto a comando
    const command = new GetItemCommand(input);

    // Enviar petición a DynamoDB
    const result = await DynamoConnection.send(command);

    console.log("result", result);
    return result;
  }

  public async saveEmployeeHistory(
    employeeId: number,
    salaries: ISalaryHistory
  ): Promise<void> {
    const value: AttributeValue = {
      M: {
        updateDate: {
          S: new Date().toString(),
        },
        previousSalary: {
          N: `${salaries.previousSalary}`,
        },
        newSalary: {
          N: `${salaries.newSalary}`,
        },
      },
    };

    const query = await this.getEmployeeHistory(employeeId);
    let history = query.Item ? query.Item.history.L : [];

    history.push(value);

    const input: PutItemCommandInput = {
      TableName,
      Item: {
        employeeId: {
          N: `${employeeId}`,
        },
        history: {
          L: history,
        },
      },
    };

    const command = new PutItemCommand(input);
    await DynamoConnection.send(command);

    console.log("save", employeeId, salaries);
  }
}

export default HistoricoQuery;
