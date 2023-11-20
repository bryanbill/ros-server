import { User } from "../models/index.js";

export class UserService {
    constructor() {
        this.user = User;
    }

    async getAll() {
        return await this.user.findAll();
    }

    async getById(id) {
        return await this.user.findByPk(id);
    }

    async update(id, body) {
        return await this.user.update(body, {
            where: {
                id
            }
        });
    }

    async delete(id) {
        return await this.user.destroy({
            where: {
                id
            }
        });
    }


}