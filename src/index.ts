import cors from "cors"
import express from "express";
import {register} from "./api";
import note from "./services/note"
import user from "./services/user"
import {startDB} from "./storage/db";

const PORT = process.env.PORT ?? 8080;

const app = express();

app.use(cors());

register(app, {
    note,
    user,
});

startDB().then(() => {
    app.listen(PORT)
    console.log(`🎉 Listening on port ${PORT}...`);
})
