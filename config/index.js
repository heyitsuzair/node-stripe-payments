module.exports.Stripe_Client = class Stripe_Client {
  constructor(secret_key) {
    // this.publishable_key = publishable_key;
    this.secret_key = secret_key;
    this.stripe = require("stripe")(this.secret_key);
  }
  async card_token(card_no, exp_month, exp_year, cvc) {
    this.has_secret_key();
    this.have_card_details(card_no, exp_month, exp_year, cvc);

    try {
      // Generate Token From Provided Card Details
      const token = await this.stripe.tokens.create({
        card: {
          number: card_no,
          exp_month: exp_month,
          exp_year: exp_year,
          cvc: cvc,
        },
      });
      return token;
    } catch ({ message }) {
      throw new Error(message);
    }
  }

  has_secret_key() {
    // Check Whether the Secret Key is Provided Or Not
    if (!this.secret_key)
      throw new Error("Please Provide A Valid Secret Key In Stripe Client");
  }

  have_card_details(card_no, exp_month, exp_year, cvc) {
    if (!card_no)
      throw new Error("Please Provide Card Number In 'card_token' Method");
    if (!exp_month)
      throw new Error(
        "Please Provide Card Expiry Month In 'card_token' Method"
      );
    if (!exp_year)
      throw new Error("Please Provide Card Expiry Year In 'card_token' Method");
    if (!cvc) throw new Error("Please Provide Card CVC In 'card_token' Method");
  }

  async charge_card(amount, currency, source, description) {
    // Check Whether The Charge Details Are Provided Of Not
    this.have_charge_details(amount, currency, source, description);
    try {
      // Create A Charge Of Card
      const charge = await this.stripe.charges.create({
        amount: amount,
        currency: currency,
        source: source,
        description: description,
      });
      return charge;
    } catch ({ message }) {
      throw new Error(message);
    }
  }
  have_charge_details(amount, currency, source) {
    if (!amount)
      throw new Error(
        "Please Provide Amount That Will Be Charged From Credit Card"
      );
    if (!currency)
      throw new Error(
        "Please Provide Currency In Which You Want To Charge Credit Card Amount"
      );
    if (!source)
      throw new Error(
        "Please Provide Token Id That You Got From 'card_token' Method"
      );
  }
  async create_checkout_session(
    line_items,
    success_url,
    cancel_url,
    mode = "payment",
    payment_method_types = ["card"]
  ) {
    this.have_checkout_session_details(line_items, success_url, cancel_url);
    try {
      const session = await this.stripe.checkout.sessions.create({
        success_url,
        line_items,
        mode,
        payment_method_types,
        cancel_url,
      });
      return session;
    } catch ({ message }) {
      throw new Error(message);
    }
  }
  have_checkout_session_details(line_items, success_url, cancel_url) {
    if (!line_items) throw new Error("Please Provide Line Items");
    if (!success_url)
      throw new Error(
        "Please Provide Success URL (URL On Which User Will Be Redirected On Successful Payment)"
      );
    if (!cancel_url)
      throw new Error(
        "Please Provide Cancel URL (URL On Which User Will Be Redirected When He/She Presses 'Back' Button On Checkout Page Hosted By Stripe)"
      );
  }
};
