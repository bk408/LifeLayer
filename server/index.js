
const express = require("express")
const cors = require("cors");

const app = express()
const stripe = require("stripe")(
  "sk_test_51Pk837FYq8DNTqK3RleN9NHS4Cg21DhQxe98lf5yOPXcn6i5BdFmyTlg9fWxIgDNcAiXgsKSBoX5akR87FTzCneC00yubQQU26"
);

app.use(cors());
app.use(express.json())


app.post("/api/create-checkout-session", async(req, res) => {
    const { products } = req.body;
    
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "amazon_pay", "us_bank_account"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({id:session.id})
 
  
});

app.listen(7000, () => {
    console.log("server is running on port 7000");
    
})