export default {
  origins: ["*"],
  headers: [
    "Content-Type",
    "X-Amz-Date",
    "Authorization",
    "X-Api-Key",
    "X-Amz-Security-Token",
    "X-Amz-User-Agent",
    "X-Amzn-Trace-Id",
  ],
  allowCredentials: false,
};
