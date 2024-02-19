// import express from "express"
import logger from "morgan";
import cors from "cors";
import flightRoute from "../routes/flight";
import userRoute from "../routes/user";
import express, {Express} from 'express';
require("dotenv").config();

const app:Express = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT: string | number = process.env.PORT || 5200;

app.get("/", (req, res) => {
  res.status(404).send("ERROR 404!");
});
app.get("/favicon.ico", (req, res) => {
  res.status(200).send("ERROR 404!");
});

//define router here
app.use("/api/booking/flight", flightRoute);

app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
