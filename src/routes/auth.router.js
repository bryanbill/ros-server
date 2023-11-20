import { Router } from "express";
import { AuthController } from "../controllers/index.js";

const router = Router();
const authController = new AuthController();

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error("Invalid credentials");

        const user = await authController.login(req.body);
        if (!user) return res.status(401).send({ message: "Invalid credentials" });
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});
router.post("/register", async (req, res) => {
    try {
        const user = await authController.register(req.body);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});
router.post("/logout", (req, res) => {
    res.send("Logout");
});
router.post("/refresh", (req, res) => {
    res.send("Refresh");
});
router.get("/forgot-password", (req, res) => {
    res.send("Forgot Password");
});
router.post("/reset-password", (req, res) => {
    res.send("Reset Password");
});
router.get("/verify", (req, res) => {
    res.send("Verify email");
});

export default router;