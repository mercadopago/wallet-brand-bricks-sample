const path = require("path");
const express = require("express");
const mercadopago = require("mercadopago");

const host = process.env.HOST;
if (!host) {
  console.log("Error: host not defined");
  process.exit(1);
}

const mercadoPagoPublicKey = process.env.MERCADO_PAGO_SAMPLE_PUBLIC_KEY;
if (!mercadoPagoPublicKey) {
  console.log("Error: public key not defined");
  process.exit(1);
}

const mercadoPagoAccessToken = process.env.MERCADO_PAGO_SAMPLE_ACCESS_TOKEN;
if (!mercadoPagoAccessToken) {
  console.log("Error: access token not defined");
  process.exit(1);
}

mercadopago.configurations.setAccessToken(mercadoPagoAccessToken);

const app = express();

/*
  If you are going to use this code as a quick start for your project,
  make sure you trust the proxy in order to keep the following line.
*/
app.set('trust proxy', true);

app.set("view engine", "html");
app.engine("html", require("hbs").__express);
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: false }));
app.use(express.static("./static"));
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).render("index", { mercadoPagoPublicKey });
});

app.get("/payment_status", (req, res) => {
  const { payment_id: paymentId } = req.query;
  res.status(200).render("status", { mercadoPagoPublicKey, paymentId });
});

app.get("/preference_id", async function (req, res) {
  const { unitPrice, quantity } = req.query;
  const backUrl = `${host}/payment_status`;

  const preference = {
    back_urls: {
      success: backUrl,
      failure: backUrl,
      pending: backUrl
    },
    auto_return: "approved",
    items: [
      {
        id: "item-ID-1234",
        title: "White t-shirt",
        unit_price: unitPrice ? Number(unitPrice) : 100,
        quantity: quantity ? parseInt(quantity) : 10,
      },
    ],
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    res.status(201).json({ preferenceId });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(8080, () => {
  console.log("The server is now running on port 8080");
});
