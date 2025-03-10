import express from "express";
import * as usersController from "../controllers/users-controller.js";

const router = express.Router();

router.route("/").post(usersController.createUser);

export default router;