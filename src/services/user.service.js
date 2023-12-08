import { User } from "../models/index.js";

export class UserService {
    constructor() {
        this.user = User;
    }

    async getAll() {
        return await this.user.findAll({
            attributes: {
                exclude: ["password"]
            }
        });
    }
    /**
     * 
     * @param {number} id 
     * @returns 
     */
    async getById(id) {
        return await this.user.findByPk(id);
    }
    /**
     * 
     * @param {string} email 
     * @returns 
     */
    async getByEmail(email) {
        const user = await this.user.findOne({
            where: {
                email
            }
        });
        return user?.dataValues;
    }

    /**
     * 
     * @param {*} id 
     * @param {*} body 
     * @returns 
     */
    async create(body) {
        return await this.user.create(body);
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