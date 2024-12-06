import express from "express";
import { loginController, registerController } from "../controllers/authControllers.js";

// router object
const router = express.Router();

// routing
// Register || Method Post
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController);

export default router;
