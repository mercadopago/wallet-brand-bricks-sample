# Payment processing with Checkout Bricks

This project uses the Mercado Pago's Checkout Bricks to build a checkout experience.
<br>
Wallet Brick is used to redirect the payer to Mercado Pago and Brand Brick is used to show the payer the benefits of using Mercado Pago.

## :computer: Technologies

- Node.js
- [NPM](https://www.npmjs.com) (dependency manager)
- Express

## ❗ Attention
- Brand Brick is currently only available for Argentina. If you are developing for Brazil, Chile, Colombia, Mexico, Peru, and Uruguay, be aware that a skeleton loading banner will remain at the top of the page and disregard the code that implements it.
- Wallet Brick is currently in a migrations proccess. For now, it is only available for Chile, Colombia, Mexico, Peru, and Uruguay. The integration structure will soon change to accommodate new integrations, but the current one will continue to work.

## 💡 Requirements

- Node.js 10 or higher (you can download it [here](https://nodejs.org/)).
- [Read our instructions](https://www.mercadopago.com/developers/en/docs/getting-started) on how to create an application at the Mercado Pago Developer Panel in order to acquire your public key and access token. They will grant you access to Mercado Pago's public APIs.

## :gear: Installation

1. Clone the project.

```bash
git clone https://github.com/mercadopago/wallet-brand-bricks-sample-node.git
```

2. Go to the project's folder.

```bash
cd wallet-brand-bricks-sample-node
```

3. Then install the dependencies.

```bash
npm install
```

## 🌟 How to run it

1. Run the following command to start the application:

```bash
npm run localtunnel
``` 

2. Copy the generated URL: _(it may take a few seconds to show the URL)_

<img width="531" alt="image" src="https://github.com/meliguicarvalho/wallet-brand-bricks-sample/assets/95773606/15f07281-5ca8-4a92-a651-b52c188bf8d6">

3. Keep the previous terminal instance running and open a new one. In the new terminal instance, run the following command:

```bash
HOST=YOUR-URL MERCADO_PAGO_SAMPLE_PUBLIC_KEY=YOUR-PUBLIC-KEY MERCADO_PAGO_SAMPLE_ACCESS_TOKEN=YOUR-ACCESS-TOKEN npm start
``` 

4. Remember to replace `YOUR-URL` with the URL from the step 2, `YOUR_PUBLIC_KEY` and `YOUR_ACCESS_TOKEN` with the corresponding [credentials](https://www.mercadopago.com/developers/panel) from your account.

5. Navigate to `YOUR-URL` from step 2 in your browser. In your first access to this URL, you will be prompted with a warning page. You'll need to inform your public IP Address, but don't worry, the warning page shows you how you can do that. Then paste your public IP in the input field and  **"Click to Submit"**.

6. That's all, now you can access your localhost running app through the URL exposed by localtunnel.

### :test_tube: Testing

On our [testing instructions](https://www.mercadopago.com/developers/en/docs/checkout-bricks/integration-test/test-payment-flow) you'll find **[credit cards](https://www.mercadopago.com/developers/en/docs/checkout-bricks/integration-test/test-cards)** that can be used along with this sample and a guide on how to create **test users**.

## :handshake: Contributing

You can contribute to this project by reporting problems and bugs. Before opening an issue, make sure to read our [code of conduct](CODE_OF_CONDUCT.md).

## :bookmark: License

MIT License. Copyright (c) 2023 - Mercado Pago <br/>
For more information, see the [LICENSE](LICENSE) file.
