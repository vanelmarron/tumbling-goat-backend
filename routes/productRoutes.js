import express from "express";
import * as productsController from "../controllers/products-controller.js";

const router = express.Router();

router.route("/").get(productsController.getAllProducts);

router.route("/:id").get(productsController.getProductById);

router
  .route("/:id/reviews")
  .get(productsController.getReviews)
  .post(productsController.postNewReview);

router
  .route("/:id/reviews/:reviewId")
  .get(productsController.getReviewById)
  .put(productsController.editReview)
  .delete(productsController.deleteReview);

export default router;
