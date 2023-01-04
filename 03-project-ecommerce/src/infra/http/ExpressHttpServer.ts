import express, { Request, Response } from "express";

import { HttpServer } from "./HttpServer";

export class ExpressHttpServer implements HttpServer {
  app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  on(method: string, url: string, callback: Function): void {
    this.app[method](url, (req: Request, res: Response) => {
      try {
        const output = callback(req.params, req.body);
        res.json(output);
      } catch (error: any) {
        res.status(422).json({
          message: error.message,
        });
      }
    });
  }

  listen(port: number): void {
    return this.app.listen(port);
  }
}
