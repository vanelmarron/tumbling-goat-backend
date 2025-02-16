import express from "express";
import * as productsController from "../controllers/products-controller.js";

const router = express.Router();

router.route("/").get(productsController.getAllProducts);

router.route("/:id").get(productsController.getProductById);

router.route("/:id/reviews").get(productsController.getReviews);

router.route("/:id/reviews/:reviewId").get(productsController.getReviewById)

export default router;