import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { UserService } from "../services/user.service.js";
import e from "express";

const authMiddleware = async (/**@type {e.Request} */req, /**@type {e.Response} */ res, /**@type {e.NextFunction} */ next) => {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(401).send({
        message: "Unauthorized"
    });

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await new UserService().getById(decoded.id);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
};


const adminMiddleware = (/**@type {Request} */req, /**@type {Response} */ res, /**@type {NextFunction} */ next) => {
    if (req.user.role !== "admin") return res.status(403).send({
        message: "Forbidden"
    });
    next();
}

export {
    authMiddleware,
    adminMiddleware
};