
# Node Stripe Payments

⚡️ Node Js Package For Implementing Stripe Payments In Express/Node Js




## Installation

Install node-stripe-payments with npm/yarn

```bash
  npm install node-stripe-payments
  yarn add node-stripe-payments
```

# Examples

## Charge A Credit Card

```javascript
const { Stripe_Client } = require("node-stripe-payments");

// Create An Instance of "Stripe_Client" Class
nsp_client = new Stripe_Client(""); // Provide Your Stripe Secret Key

async function chargeCreditCard() {
  try {
    /**
     * @method card_token Creates A Card Token
     *
     * For More Information See The Reference https://stripe.com/docs/api/tokens/create_card?lang=node
     *
     * @params @required (Card No,Expiry Month, Expiry Year, CVC) Card Details From Which You Want To Charge/Take Amount
     */
    card_token = await nsp_client.card_token("4242424242424242", 12, 2025, 123); // Returns Promise

    /**
     * @method charge_card Will Call Stripe API To Charge The Card Against Token ID That You Will Get In @response of "card_token" @method
     *
     * For More Information See The Reference https://stripe.com/docs/api/charges/create?lang=node
     *
     * @params (amount, currency, source, description)
     *
     * @param amount: Amount That Will Be Charged From Credit Card (In Cents) @required
     * @param currency: Currency In Which You Want To Charge. Visit: https://stripe.com/docs/currencies @required
     * @param source: Token ID Which You Will Get In Response from "card_token" @method @required
     * @param description: Description Of Charge
     */
    card_charge = await nsp_client.charge_card(
      200000,
      "pkr",
      card_token.id,
      "Test"
    ); // Returns Promise
    console.log(card_charge); // Response Of Charge From Stripe
  } catch ({ message }) {
    console.log(message); // It Will Throw Error Message If Card Details Are Incorrect
  }
}
chargeCreditCard();

```

## Create Checkout Session

```javascript
const { Stripe_Client } = require("node-stripe-payments");

// Create An Instance of "Stripe_Client" Class
const nsp_client = new Stripe_Client(""); // Provide Your Stripe Secret Key

async function checkoutSession() {
  try {
    /**
     * @var line_items
     *
     * Line Items That Will Be Used To Show Bill And Items Along With Quantity On Checkout Page Hosted By Stripe
     *
     * For More Information See https://stripe.com/docs/api/checkout/sessions/create
     */
    const line_items = [
      {
        price_data: {
          currency: "pkr",
          unit_amount: 200000,
          product_data: {
            name: "T-shirt",
            description: "Comfortable cotton t-shirt",
            // images: [""],  You Can Provide Product Images Here
          },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: "pkr",
          unit_amount: 200000,
          product_data: {
            name: "Hoodie",
            description: "Comfortable cotton Hoodie",
            // images: [""],  You Can Provide Product Images Here
          },
        },
        quantity: 2,
      },
    ];

    /**
     * @method create_checkout_session
     *
     * @params (line_items,success_url,cancel_url) @required
     * @params (mode,payment_method_types) @optional
     */
    const session = await nsp_client.create_checkout_session(
      line_items,
      "https://www.google.com",
      "https://www.facebook.com"
    ); // Returns Promise
    console.log(session); // Returns An Object On Success. It Returns "url" in object that you can send to frontend in response and from frontend you can redirect user to url to pay amount
  } catch ({ message }) {
    console.log(message);
  }
}
checkoutSession();

```


## Documentation

[Official Page](https://github.com/heyitsuzair/node-stripe-payments)


## Features

- Credit Card Payments
- Checkout Sessions

