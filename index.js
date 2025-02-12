import express from "express";
import cors from "cors";
import "dotenv/config"
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the In-Stock API Backend!");
});

app.listen(PORT, () => {
  console.log(`Server listening on  http://localhost:${PORT}`);
});
