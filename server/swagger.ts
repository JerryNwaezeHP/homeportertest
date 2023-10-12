import { Express, Request, Response } from "express"
import * as swaggerJsDoc from "swagger-jsdoc"
import * as swaggerUi from 'swagger-ui-express'
import { version } from "./package.json"
import { Logger } from "./src/utils/logger"

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version,
      title: "HomePorter API documentation",
      description: "",
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
      },
    },
    host: "http://localhost:8080",
    basePath: "/api/v1",
    schemes: ["http"],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
}

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app: Express, port: number) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/docs.json", (_req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  Logger.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
