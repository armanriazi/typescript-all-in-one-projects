/// http://localhost:8000/api/users/
/// http://localhost:8000/api/users/[id]
/// http://localhost:8000/api/users/shop

import "reflect-metadata"; //allows the decorator to work
import express from "express";
import "./controllers/User.controller";
//This is the dependency injection container that will allow us to retrieve and resolve some instances from the Dependency injection container
import { Container } from "inversify";
import UserRepository from "./repos/User.repository";
import UserService from "./services/User.service";
import { InversifyExpressServer } from "inversify-express-utils";
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(express.static("public"));
app.use(express.json());
app.set("view engine", "ejs");
//
app.use("/users", userRoutes);
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
const container = new Container();
container.bind(UserRepository).toSelf();
container.bind(UserService).toSelf();

//http://localhost:8000/api/users/
let server = new InversifyExpressServer(
  container,
  null,
  { rootPath: "/api" },
  app
);



let appConfigured = server.build();

//You need to avoid calling app when appConfigured listens when you run tests.So we don't listen in this file
export { app, appConfigured };
