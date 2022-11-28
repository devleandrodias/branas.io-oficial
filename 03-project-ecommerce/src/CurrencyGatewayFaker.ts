import { CurrencyGateway } from "./CurrencyGateway";

export class CurrencyGatewayFaker implements CurrencyGateway {
  async getCurrencies(): Promise<any> {
    return { USD: 2, BRL: 1 };
  }
}
