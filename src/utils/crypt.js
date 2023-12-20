import bcrypt from 'bcryptjs';
import { config } from '../config/index.js';
import jwt from 'jsonwebtoken';

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(parseInt(config.SALT) ?? 10);
    return bcrypt.hash(password, salt);
};

/**
 * @param {{email: '', role: '', id: 0}} user
 * @param {boolean} isRefreshToken 
 * @returns
 */
const jwtToken = (user, isRefreshToken = false) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, config.JWT_SECRET, {
        expiresIn: isRefreshToken ? "7d" : config.JWT_EXPIRATION
    });
    return token
};

export {
    hashPassword,
    jwtToken
};