import { Checkout } from "../src/application/Checkout";
import { GetOrderByCpf } from "../src/application/GetOrderByCpf";
import { OrderDataDatabase } from "../src/infra/data/OrderDataDatabase";
import { CouponDataDatabase } from "../src/infra/data/CouponDataDatabase";
import { ProductDataDatabase } from "../src/infra/data/ProductDataDatabase";
import { PgPromiseConnection } from "../src/infra/database/PgPromiseConnection";

test("Deve consultar um pedido", async () => {
  const connection = new PgPromiseConnection();

  const productData = new ProductDataDatabase(connection);
  const couponData = new CouponDataDatabase(connection);
  const orderData = new OrderDataDatabase(connection);

  const checkout = new Checkout(productData, couponData, orderData);

  const input = {
    cpf: "905.780.100-03",
    items: [
      { idProduct: 1, quantity: 1 },
      { idProduct: 2, quantity: 1 },
      { idProduct: 3, quantity: 3 },
    ],
  };

  await checkout.execute(input);
  const getOrder = new GetOrderByCpf(orderData);
  const output = await getOrder.execute("905.780.100-03");

  expect(output.total).toBe(6350);
  await connection.close();
});
