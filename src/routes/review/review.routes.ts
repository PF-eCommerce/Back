import express from 'express'
import { postReview, getAllReviews, deleteReview, getProductReviews, getUserReviews, getReview } from "../../controllers/review.controller";

const router = express.Router()
//CREAR
router.post("/products/:productId/review", postReview);
//TRAER TODAS
router.get("/reviews", getAllReviews);
//TRAER UNA EN PARTICULAR
router.get("/review/:reviewId", getReview);
//TRAER POR PRODUCTO
router.get("/products/:productId/reviews", getProductReviews);
//TRAER POR USER
router.get("/user/:userId/reviews", getUserReviews);
//BORRAR DESDE DETAIL
router.delete("/products/:productId/review/:reviewId", deleteReview);
//BORRAR DESDE ADMIN
router.delete("/review/:reviewId", deleteReview);

export default router
