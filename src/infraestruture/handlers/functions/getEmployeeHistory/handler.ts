// import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { IResponseApi } from "../../../../application/interfaces/response-controller-interface";
import HistoryController from "src/application/controllers/historico-controller";

const historyController = new HistoryController();

const getEmployeeHistory: ValidatedEventAPIGatewayProxyEvent<any> = async (
  event: any
) => {
  const response: IResponseApi = await historyController.getEmployeeHistory(
    +event.pathParameters.employeeId
  );

  return formatJSONResponse(response.statusCode, response);
};

export const main = middyfy(getEmployeeHistory);
