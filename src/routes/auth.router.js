import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { loginSchema, registerSchema, resetPasswordSchema, tokenSchema } from "../middleware/index.js";
import { query, validationResult } from "express-validator";
import { Request, Response } from "express";

const router = Router();
const authController = new AuthController();


router.post("/login", loginSchema, async (/**@type {Request} */req, /**@type {Response} */ res) => {
    try {
        const result = validationResult(req);

        if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

        authController
            .login(req.body).then((user) => {
                if (!user) return res.status(401).send({ message: "Invalid credentials" });
                return res.status(200).send(user);
            }).catch((err) => {
                return res.status(401).send({ message: err.message });
            });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post("/register", registerSchema, async (/**@type {Request} */req, /**@type {Response} */ res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

        const user = await authController.register(req.body);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post("/logout", tokenSchema, (/**@type {Request} */req, /**@type {Response} */ res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

    res.send("Logout");
});

router.post("/refresh", tokenSchema, (/**@type {Request} */req, /**@type {Response} */ res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

    res.send("Refresh");
});

router.get("/forgot-password",
    query("email", "Invalid email")
        .notEmpty()
        .trim()
        .isEmail(),
    (/**@type {Request} */req, /**@type {Response} */ res) => {
        res.send("Forgot Password");
    });

router.post("/reset-password", resetPasswordSchema, (/**@type {Request} */req, /**@type {Response} */ res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

    res.send("Reset Password");
});

router.patch("/verify", tokenSchema, (/**@type {Request} */req, /**@type {Response} */ res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

    res.send("Verify email");
});

export default router;