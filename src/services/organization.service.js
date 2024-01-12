import { isEmpty } from "bullmq";
import { Organization } from "../models/index.js";


export class OrganizationService {
    constructor() {
        this.organization = Organization;
    }

    /**
     * Fetch all the organizations
     */
    async getAllOrgs() {
        const orgs = await this.organization.findAll();

        console.log(orgs);

        return orgs.map((org) => org?.dataValues);

    }


    /**
     * Get organization by ID
     * @param {*} orgId
     */
    async getOrgBId(orgId) {
        const org = await this.organization.findByPk(orgId);

        return org?.dataValues;
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
        console.log(`New User: ${user}`);

        return await user;
    }

    async update(body, id) {
        console.log(body);

        return await this.organization.update(body, {
            where: {
                id
            }
        });

    }

    async delete(id) {
        return await this.organization.destroy({
            where: {
                id
            }
        });

    }
}