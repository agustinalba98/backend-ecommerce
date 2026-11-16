import { Router } from "express";
import { createUser, login } from "../controllers/user.controller.js";


const router = Router ();

// Crear usuario
router.post("/users", createUser);
//Login
router.post("/users/login", login)




export default router;