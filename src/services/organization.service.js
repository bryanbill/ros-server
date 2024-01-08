import { Organization } from "../models/index.js";



export class OrganizationService {
    constructor() {
        this.organization = Organization;
    }

    /**
     * Get an organizationByName
     * @param {string} orgName
     */
    async getOrganizationByName(orgName) {
        const org = await this.organization.findOne({
            where: {
                orgName
            }
        });

        return org?.dataValues;
    }

    /**
     * Get Organization by Slug
     * @param {string} orgSlug
     */
    async getOrganizationBySlug(orgSlug) {
        const org = await this.organization.findOne({
            where: {
                orgSlug
            }
        });

        return org?.dataValues;
    }


    async create(body) {
        const user = (await this.organization.create(body)).dataValues;

        return await user;
    }

    async update(body) {

    }

    async delete(body) {

    }
}