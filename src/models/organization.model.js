import { database } from "../config/index.js";
import { DataTypes } from "sequelize";
import chalk from "chalk";


export const Organization = database.sequelize.define('Organization', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    orgName: {
        type: DataTypes.STRING,
    },
    orgSlug: {
        type: DataTypes.STRING,
    },
},
    {
        tableName: 'organizations',
        paranoid: true
    }
);


chalk.green('Organization table has been successfully created!!');