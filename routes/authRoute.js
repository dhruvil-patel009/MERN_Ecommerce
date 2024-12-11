import express from "express";
import { forgotPasswordController, loginController, registerController, testController } from "../controllers/authControllers.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing
// Register || Method Post
router.post("/register", registerController);

// Login || Post
router.post("/login", loginController);

// ForgotPassword || POST
router.post('/forgot-password', forgotPasswordController)

// Test || Protected Route || Method Get
router.get("/test", requireSignIn, isAdmin, testController);


//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

//Admin protected route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});


export default router;
