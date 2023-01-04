import { HttpServer } from "../http/HttpServer";
import { Checkout } from "../../application/Checkout";

export class RestController {
  constructor(readonly httpService: HttpServer, readonly checkout: Checkout) {
    httpService.on("post", "checkout", async (_: any, body: any) => {
      const output = await checkout.execute(body);
      return output;
    });
  }
}
