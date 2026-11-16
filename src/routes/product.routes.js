import { Router } from "express";

import {
        getProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct
} from "../controllers/product.controller.js";

import { authenticate, isAdmin} from "../middleware/auth.js";

const router = Router ();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", authenticate, isAdmin, createProduct);
router.put("/products/:id", authenticate, isAdmin, updateProduct);
router.delete("/products/:id", authenticate, isAdmin, deleteProduct);





export default router;
