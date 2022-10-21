import readUser from "../controller/userController.js";
import { Router } from "express";

const route = Router();

route.get("/user", readUser);

export default route;
