import { User } from '../models/index.js';

export class AuthService {
    constructor() {
        this.user = User;
    }

    async login(body) {
        const user = await this.user.findOne({
            where: {
                email: body.email
            }
        });

        return user;
    }

    async register(body) {
        const user = await this.user.findOne({
            where: {
                email: body.email
            }
        });

        if (user) throw new Error("User already exists");
        return await this.user.create(body);
    }

    async logout(token) {
        // ...
    }

    async refresh(refreshToken) {
        // ...
    }

    async forgotPassword(email) {
        // ...
    }

    async resetPassword(body) {
        // ...
    }

    async verifyEmail(token) {
        // ...
    }

}