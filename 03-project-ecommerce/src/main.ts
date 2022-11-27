import pgp from "pg-promise";
import express from "express";
import { envs } from "../config/env";
import { validate } from "./CpfValidator";

const app = express();

app.use(express.json());

const connection = pgp()(envs.postgresUrlConnection);

// const products = [
//   {
//     idProduct: 1,
//     description: "A",
//     price: 1000,
//   },
//   {
//     idProduct: 2,
//     description: "B",
//     price: 5000,
//   },
//   {
//     idProduct: 3,
//     description: "C",
//     price: 30,
//   },
// ];

// const coupons = [{ code: "VALE20", percentage: 20 }];

app.post("/checkout", async (req, res) => {
  const isValid = validate(req.body.cpf);

  if (!isValid) {
    return res.status(422).json({
      message: "Invalid CPF",
    });
  } else {
    let total = 0;

    for (const item of req.body.items) {
      // const product = products.find(
      //   (product) => product.idProduct === item.idProduct
      // );

      const [product] = await connection.query(
        "select * from cccat9.product where id_product = $1",
        [item.idProduct]
      );

      if (!product) {
        return res.status(422).json({
          message: "Product not found",
        });
      } else {
        total += Number(product.price) * item.quantity;
      }
    }

    if (req.body.coupon) {
      // const coupon = coupons.find((coupon) => coupon.code === req.body.coupon);

      const [coupon] = await connection.query(
        "select * from cccat9.coupon where code = $1",
        [req.body.coupon]
      );

      if (coupon) {
        total -= (total * coupon.percentage) / 100;
      }
    }

    res.json({ total });
  }
});

app.listen(3000);
