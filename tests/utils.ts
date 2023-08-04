import { Sequelize } from 'sequelize'

export const cleanDB = async (sequelize: Sequelize) => {
  await sequelize.sync({ force: true })
}
