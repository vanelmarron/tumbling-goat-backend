import express from "express";
import * as productsController from "../controllers/products-controller.js";

const router = express.Router();

router.route("/").get(productsController.getAllProducts);

export default router;