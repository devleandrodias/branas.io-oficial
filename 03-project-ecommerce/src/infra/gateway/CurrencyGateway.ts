import { Currencies } from "../../domain/entities/Currencies";

export interface CurrencyGateway {
  getCurrencies(): Promise<Currencies>;
}
