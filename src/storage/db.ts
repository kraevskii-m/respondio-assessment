import {Sequelize} from "sequelize";
import 'dotenv/config'

export let sequelize: Sequelize;
export const startDB = async (): Promise<void> => {
    if (!process.env.DB_URL) {
        throw new Error("No Sequelize config provided")
    }
    sequelize = new Sequelize(process.env.DB_URL)
    try {
        await sequelize.authenticate()
        console.log("Connection to DB successful")
    } catch (err) {
        console.error('Unable to connect to the database:', err)
    }
}

// export const syncDB = async ():