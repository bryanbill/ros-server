import chalk from "chalk";
import { Organization } from "../models/index.js";
import { OrganizationService } from "../services/organization.service";
import { where } from "sequelize";
import { isEmpty } from "bullmq";

// validation of the Organization Service

export class OrganizationController {

    constructor() {
        this.organization = new OrganizationService();
    }

    /**
     * @return {Promise<object[]>}
     */
    async getAll() {
        return this.organization.getAllOrgs();
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<object>}
     */
    async getOrg(id) {
        try {
            if (!isEmpty(this.organization.getOrgBId())) return this.organization.getOrgBId(id);
        } catch (error) {
            chalk.red(`Error: ${error}`);
        }
        // return this.organization.getOrgBId(id);
    }

    /**
     * @param {Object|Organization} body
     * @return {Promise<boolean>}
     */
    async create(body) {
        try {
            const user = await this.organization.create(body);

            chalk.green('Organization created successfully');

            return user;
        } catch (error) {
            chalk.red(`Error:${error}`)
        }
    }

    /**
     * 
     * @param {object} body 
     * @param {number} id 
     * @returns {Promise<boolean>}
     */
    async updateOrg(body, id) {
        try {
            return await (this.organization.update(body, id))[0] > 0;
        } catch (error) {
            chalk.red(`Error: ${error}`);
        }
    }

    /**
     * 
     * @param {number} id 
     * @returns {Promise<boolean>}
     */
    async deleteOrg(id) {
        try {
            return await (this.organization.delete(id, {
                where: {
                    id
                }
            }));
        } catch (error) {
            chalk.red(`Error: ${error}`);
        }
    }
}
