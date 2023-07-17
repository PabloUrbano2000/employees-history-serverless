// import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { IResponseApi } from "../../../../application/interfaces/response-controller-interface";
import schema from "./schema";
import HistoryController from "src/application/controllers/historico-controller";

const historyController = new HistoryController();

const saveEmployeeHistory: ValidatedEventAPIGatewayProxyEvent<
  typeof schema
> = async (event: any) => {
  const salaries = {
    previousSalary: event.body.previousSalary,
    newSalary: event.body.newSalary,
  };

  const employeeId = +event.pathParameters.employeeId;

  const response: IResponseApi = await historyController.saveEmployeeHistory(
    employeeId,
    salaries
  );
  return formatJSONResponse(response.statusCode, response);
};

export const main = middyfy(saveEmployeeHistory);
