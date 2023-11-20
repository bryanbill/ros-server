import { AuthService } from "../services/auth.service.js";

export class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    async login(body = { email: "", password: "" }) {
        // validate body

        const user = await this.authService.login(body);
        return user;
    }
    async register(body) {
        // validate body
        const newBody = {
            ...body,
            name: body.firstname + " " + body.lastname,
        }
        const user = await this.authService.register(newBody);
        return user;
    }
    async logout(token = "") {
        if (!token) throw new Error("Invalid token");

        // ...

        return {};
    }
    async refresh(refreshToken = "") {
        if (!refreshToken) throw new Error("Invalid refresh token");

        // ...

        return {};
    }
    async forgotPassword(email = "") {
        if (!email) throw new Error("Invalid email");

        // ...

        return {};
    }
    async resetPassword(body = {
        password: "",
        passwordConfirmation: "",
        token: "",
    }) {
        const { password, passwordConfirmation, token } = body;
        if (!password || !passwordConfirmation || !token) throw new Error("Invalid credentials");

        // ...

        return {};

    }
    async verifyEmail(body = {
        token: ""
    }) {
        const { token } = body;
        if (!token) throw new Error("Invalid token");

        // ...

        return {};
    }
}