import { Router } from "express";
import { AuthController } from "../controllers/index.js";
import { loginSchema, registerSchema, resetPasswordSchema, tokenSchema } from "../middleware/index.js";
import { query, validationResult } from "express-validator";
import e from "express";
import { verifyToken } from "../utils/crypt.js";

const router = Router();
const authController = new AuthController();


router.post("/login", loginSchema, async (/**@type {e.Request} */req, /**@type {e.Response} */ res) => {
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

router.post("/register", registerSchema, async (/**@type {e.Request} */req, /**@type {e.Response} */ res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

        const user = await authController.register(req.body);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post("/logout", tokenSchema, (/**@type {e.Request} */req, /**@type {e.Response} */ res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

    res.send("Logout");
});

router.post("/refresh", tokenSchema, (/**@type {e.Request} */req, /**@type {e.Response} */ res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

    res.send("Refresh");
});

router.get("/forgot-password",
    query("email", "Invalid email")
        .notEmpty()
        .trim()
        .isEmail(),
    (/**@type {e.Request} */req, /**@type {e.Response} */ res) => {
        res.send("Forgot Password");
    });

router.post("/reset-password", resetPasswordSchema, (/**@type {e.Request} */req, /**@type {e.Response} */ res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ message: result.array()[0].msg });

    res.send("Reset Password");
});

router.get("/verify", (/**@type {e.Request} */req, /**@type {e.Response} */ res) => {
    try {
        const { token } = req.query;
        if (!token) return res.status(400).send({ message: "Invalid email" });

        const decoded = verifyToken(token);
        authController.verifyEmail(decoded.id).then((state) => res.send("<b>Success!</b>")).catch((err) => {
            return res.send("<b>Failed!</b>");
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
});

export default router;