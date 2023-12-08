import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
/**
 * 
 * @param {Request} req
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"].split(" ")[1];
    if (!token) return res.status(401).send({
        message: "Unauthorized"
    });

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).send({
            message: "Unauthorized"
        });
    }
};

/**
 * @param {Request} req
 * @param {Response} res 
 * @param {import("express").NextFunction} next 
 * @returns 
 */
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).send({
        message: "Forbidden"
    });
    next();
}

export {
    authMiddleware,
    adminMiddleware
};