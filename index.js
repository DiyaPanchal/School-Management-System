import express from "express";
import "dotenv/config";
import apiRouter from "./routes/api.js";
import connectDB from "./db.js";

const app = express();
const PORT = process.env.PORT || 3002;

app.use("/", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});

connectDB();
