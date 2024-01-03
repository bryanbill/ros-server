import { User } from "../models/index.js";
import { UserService } from "../services/index.js";
export class UserController {
    constructor() {
        this.userService = new UserService();
    }

    /**
     * 
     * @param {number} id 
     * @returns {User}
     */
    async getUser(id) {
        return (await this.userService.getById(id));
    }

    /**
     * @returns {User[]}
     */
    async getAllUsers() {
        return (await this.userService.getAll());
    }

    /**
     * 
     * @param {number} id 
     * @param {User} body 
     * @returns {boolean}
     */
    async updateUser(id, body) {
        return (await this.userService.update(id, body))[0] > 0;
    }

    /**
     * 
     * @param {number} id 
     * @returns {boolean}
     */
    async deleteUser(id) {
        return (await this.userService.delete(id)) > 0;
    }
}