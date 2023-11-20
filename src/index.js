import express from "express";
import cors from "cors";
import { config, database } from "./config/index.js";
import morgan from "morgan";
import router from "./routes/index.js";

const init = async () => {
    const db = await database.connect().then(async (db) => await db.sync());
    if (!db) return;

    const app = express();
    app.use(cors())
        .use(express.json())
        .use(express.urlencoded({ extended: true }))

    config.ENV === 'development' ? app.use(morgan('dev')) : null;
    app.use(`/api/${config.VERSION}`, router);

    app.listen(config.PORT, () => {
        console.log("Server running on PORT", config.PORT)
    })
}

init();