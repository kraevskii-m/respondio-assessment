import { QueryInterface, DataTypes } from 'sequelize'

const up = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable('notes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    text: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    noteType: {
      type: DataTypes.ENUM('Personal', 'Work', 'Family', 'Hobby'),
      defaultValue: 'Personal',
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
  })
}

const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface
}) => {
  await queryInterface.dropTable('users')
}

module.exports = { up, down }
