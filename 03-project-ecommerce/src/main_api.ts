import { envs } from "../config/env";
import { Checkout } from "./application/Checkout";
import { RestController } from "./infra/controller/RestController";
import { ExpressHttpServer } from "./infra/http/ExpressHttpServer";
import { OrderDataDatabase } from "./infra/data/OrderDataDatabase";
import { CouponDataDatabase } from "./infra/data/CouponDataDatabase";
import { ProductDataDatabase } from "./infra/data/ProductDataDatabase";
import { PgPromiseConnection } from "./infra/database/PgPromiseConnection";

const connection = new PgPromiseConnection();
const productData = new ProductDataDatabase(connection);
const couponData = new CouponDataDatabase(connection);
const orderData = new OrderDataDatabase(connection);
const checkout = new Checkout(productData, couponData, orderData);
const httpServer = new ExpressHttpServer();
new RestController(httpServer, checkout);
httpServer.listen(envs.appPort);
