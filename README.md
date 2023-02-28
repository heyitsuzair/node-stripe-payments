
# Node Stripe Payments

⚡️ Node Js Package For Implementing Stripe Credit Card Payments In Express/Node Js




## Installation

Install node-stripe-payments with npm/yarn

```bash
  npm install node-stripe-payments
  yarn add node-stripe-payments
```

## Example

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