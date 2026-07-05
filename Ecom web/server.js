const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// allow JSON from frontend
app.use(express.json({ limit: "10mb" }));

// serve index.html and script.js
app.use(express.static(__dirname));

// receive order data
app.post("/order", (req, res) => {
  if (!fs.existsSync("orders")) {
    fs.mkdirSync("orders");
  }

  fs.writeFileSync(
    `orders/order_${Date.now()}.json`,
    JSON.stringify(req.body, null, 2)
  );

  res.json({ status: "saved" });
});

// start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});

