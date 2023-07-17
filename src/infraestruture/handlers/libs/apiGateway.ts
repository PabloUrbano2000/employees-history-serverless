import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import cors from "src/infraestruture/helpers/cors";
// import type { FromSchema } from "json-schema-to-ts";
import { IResponse } from "src/infraestruture/interfaces/response-handler-interface";

type ValidatedAPIGatewayProxyEvent<T> = Omit<APIGatewayProxyEvent, "body"> & {
  body: T;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;

export const formatJSONResponse = (
  statusCode: number = 200,
  body: IResponse
) => {
  return {
    statusCode,

    headers: {
      "Access-Control-Allow-Headers": cors.headers.toString(),
      "Access-Control-Allow-Origin": cors.origins.toString(),
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify(body),
  };
};
