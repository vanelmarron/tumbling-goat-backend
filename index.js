import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Tumbling Goat API Backend!");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost:${PORT}`);
});
