import express from "express";
import * as productFunction from "../../controllers/products.controller";

const router = express.Router();

router.post("/product", productFunction.postProduct);
router.get("/products", productFunction.getProduct);
router.get("/products/genre", productFunction.getProductByGenre);
router.get("/products/search", productFunction.getBySearch);
router.get("/products/:id", productFunction.getProductById);
router.get("/productsAll", productFunction.getAllProducts)
router.put("/products/:id", productFunction.updateProduct);
router.delete("/products/:id", productFunction.deleteProduct);

export default router;
