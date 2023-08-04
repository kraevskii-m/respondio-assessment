import dotenv from 'dotenv'
import { cleanDB } from './utils'
import { sequelize } from '../src/storage/db'

module.exports = async () => {
  const config = dotenv.config({ path: `.env.test` })

  process.env = {
    ...process.env,
    ...config.parsed,
  }
  await cleanDB(sequelize)
}
