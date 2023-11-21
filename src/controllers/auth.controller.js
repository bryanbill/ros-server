import { UserService } from "../services/index.js";

export class AuthController {
    constructor() {
        this.userService = new UserService();
    }

    async login(body) {
        const user = await this.userService.login(body);
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