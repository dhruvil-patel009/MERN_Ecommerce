import express from "express";
import { loginController, registerController, testController } from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// Register || Method Post
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController);

// Test || Protected Route || Method Get
router.get("/test", requireSignIn, isAdmin, testController);


//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});


export default router;
