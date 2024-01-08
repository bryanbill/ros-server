import { database } from "../src/config/index.js";
import { DataTypes } from "sequelize";
import test from "ava"

const db = await database.connect()

test("Database connection", (t) => {
    if (!db) t.fail("Database connection failed")
    t.pass("Database connection success")
})

test("Database Sync", async (t) => {
    const model = db.sequelize.define("test", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    await database.sync();
    await model.drop();
    t.pass("Database sync success")
})
