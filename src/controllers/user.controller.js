export class UserController {
    constructor() {

    }

    async getUser(id = "") {
        if (!id) throw new Error("Invalid id");

        // ...

        return {};
    }

    async getAllUsers() {
        // ...

        return [];
    }

    async updateUser(id = '', body = {}) {
        if (!id) throw new Error("Invalid id");
        if (!body) throw new Error("Invalid body");

        // ...

        return {};
    }

    async deleteUser(id = "") {
        if (!id) throw new Error("Invalid id");

        // ...

        return {};
    }
}