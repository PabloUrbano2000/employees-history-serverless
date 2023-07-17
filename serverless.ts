import type { AWS } from "@serverless/typescript";

import hello from "@functions/hello";
import getEmployeeHistory from "@functions/getEmployeeHistory";
import saveEmployeeHistory from "@functions/saveEmployeeHistory";

const serverlessConfiguration: AWS = {
  service: "historico-empleados-api",
  frameworkVersion: "2",
  // custom: {
  //   webpack: {
  //     webpackConfig: "./webpack.config.js",
  //     includeModules: true,
  //   },
  // },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "purbano-personal",
    stage: "${opt:stage}",
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      apiKeys: [
        {
          name: "apiKeyEmployeeHistory",
          description: "Protección de las API's de Histórico del empleado",
        },
      ],
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["dynamodb:PutItem", "dynamodb:GetItem"],
            Resource: {
              "Fn::Join": [
                "",
                [
                  "arn:aws:dynamodb:",
                  { Ref: "AWS::Region" },
                  ":",
                  {
                    Ref: "AWS::AccountId",
                  },
                  ":table/employee-history",
                ],
              ],
            },
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    hello,
    getEmployeeHistory,
    saveEmployeeHistory,
  },
};

module.exports = serverlessConfiguration;
