import { HttpServer } from "./HttpServer";

/**
 * Pode ser usar qualquer http server que nao
 * vai afetar funcionamento das funcionalidades
 */

export class HapiHttpServer implements HttpServer {
  on(method: string, url: string, callback: Function): void {
    throw new Error("Method not implemented.");
  }

  listen(port: number): void {
    throw new Error("Method not implemented.");
  }
}
