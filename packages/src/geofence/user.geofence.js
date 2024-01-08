import { config } from "ros-auth/src/config"

class UserGeofence {
    constructor() {
        this.geofence = config.GEOFENCE.user;
    }

    /**
     * Creates a new Geofence User
     * 
     * @param {{username:string, email:string, password:string}} options 
     * 
     * @returns {Promise<Object>}
     */
    async createUser(options) {

    }

    /**
     * Deletes a Geofence User
     * 
     * @param {string} username 
     * 
     * @returns {Promise<Object>}
     */
    async deleteUser(options) {

    }

    /**
     * Gets a Geofence User
     * 
     * @param {string} path
     * @param {string} value 
     * 
     * @returns {Promise<Object>}
     */
    async getUser(path, value) {

    }

    /**
     * Gets a paginated list of Geofence Users
     * 
     * @param {{term:string, page?:number, entries?:number}} options
     * @returns {Promise<[]>}
     */
    async getUsers(options) {
        
    }

}

export {
    UserGeofence
}