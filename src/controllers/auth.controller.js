import bcrypt from "bcryptjs";
import { UserService, QueueService } from "../services/index.js";
import { hashPassword, jwtToken } from "../utils/crypt.js";

export class AuthController {
    constructor() {
        this.userService = new UserService();

    }
    /**
     * @param { {email:'', 'password': ''}} body 
     * @returns 
     */
    async login(body) {
        const user = await this.userService.getByEmail(body.email);
        if (!user) throw new Error("Invalid credentials");
        await new Promise((resolve, reject) => {
            bcrypt.compare(body.password, user.password, (err, result) => {
                if (result) resolve(result);
                reject(new Error("Invalid credentials"));
            })
        });
        const token = jwtToken(user);
        const refreshToken = jwtToken(user, true);
        await this.userService.update(user.id, { refreshToken });
        user.token = token;
        user.refreshToken = refreshToken;
        delete user.password;
        return user;
    }
    /**
     * 
     * @param {{email:string, password:string, fullname:string }} body 
     * @returns 
     */
    async register(body) {
        var user = await this.userService.getByEmail(body.email);
        if (user) throw new Error("Email already exists");

        body.password = await hashPassword(body.password);
        user = await this.userService.create(body);

        QueueService.queue("email", {
            to: user.email,
            subject: "Welcome to the Jungle",
            html: "<h1>Welcome to the Jungle</h1>"
        })

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