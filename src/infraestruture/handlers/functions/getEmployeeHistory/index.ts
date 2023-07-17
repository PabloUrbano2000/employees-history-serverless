// import schema from "@functions/hello/schema";
import { handlerPath } from "@libs/handlerResolver";

import cors from "../../../helpers/cors";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "history/{employeeId}",
        private: true,
        cors,
      },
    },
  ],
};
