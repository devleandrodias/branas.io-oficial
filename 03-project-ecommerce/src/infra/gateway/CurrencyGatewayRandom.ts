import { Currencies } from "../../domain/entities/Currencies";
import { CurrencyGateway } from "./CurrencyGateway";

export class CurrencyGatewayRandom implements CurrencyGateway {
  async getCurrencies(): Promise<Currencies> {
    const currencies = new Currencies();
    currencies.addCurrency("USD", 3);
    currencies.addCurrency("BRL", 1);
    return currencies;
  }
}
