import {Sequelize} from "sequelize";
import 'dotenv/config'
import {SequelizeStorage, Umzug} from "umzug";


if (!process.env.DB_URL) {
    throw new Error("No Sequelize config provided")
}
export const sequelize = new Sequelize(process.env.DB_URL)
sequelize.authenticate()
    .then(() => console.log("Connection to DB successful"))
    .catch((err) => console.error('Unable to connect to the database:', err))

const umzug = new Umzug({
    migrations: { glob: 'migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
})

export const runMigrations = async () => {
    await umzug.up();
}
