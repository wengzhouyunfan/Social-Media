import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import * as path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
const app = express();
dotenv.config();
app.use(express.static('build'));
app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRouter); // http://localhost:5000/users/signup
app.use("/tour", tourRouter);
app.get("/", (req, res) => {
  res.send("Welcome to tour API");
});
app.use(function(req, res) {
  res.sendFile(path.resolve(__dirname, './build/index.html'))
})
const port = process.env.PORT || 5000;
//.connect(process.env.MONGODB_URL)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));