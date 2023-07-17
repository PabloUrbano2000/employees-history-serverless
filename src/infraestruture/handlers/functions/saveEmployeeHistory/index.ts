// import schema from "@functions/hello/schema";
import { handlerPath } from "@libs/handlerResolver";
import schema from "./schema";
import cors from "../../../helpers/cors";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "history/{employeeId}",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
        private: true,
        cors,
      },
    },
  ],
};
