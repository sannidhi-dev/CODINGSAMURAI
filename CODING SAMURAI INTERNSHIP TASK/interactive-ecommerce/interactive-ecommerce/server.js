const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "ShopSphere API is running" });
});

app.post("/api/order", (req, res) => {
  const { customer, items, total } = req.body;
  if (!customer || !items || !items.length) {
    return res.status(400).json({ ok: false, message: "Invalid order" });
  }
  res.json({
    ok: true,
    orderId: "SS-" + Math.floor(100000 + Math.random() * 900000),
    total: Number(total || 0),
    message: "Order placed successfully (demo payment)."
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`ShopSphere running at http://localhost:${PORT}`);
});
