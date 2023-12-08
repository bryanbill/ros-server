import { Router } from "express";
import { authMiddleware, adminMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", authMiddleware, adminMiddleware, (req, res) => { });
router.get("/:id", (req, res) => { });
router.patch("/:id", (req, res) => { });
router.delete("/:id", (req, res) => { });

export default router;