import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
const app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, // 10 minutes
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
