import { DataTypes, Model, Sequelize } from 'sequelize'
import 'dotenv/config'
import { SequelizeStorage, Umzug } from 'umzug'

if (!process.env.DB_URL) {
  throw new Error('No Sequelize config provided')
}
export const sequelize = new Sequelize(process.env.DB_URL, { logging: true })
sequelize
  .authenticate()
  .then(() => console.log('Connection to DB successful'))
  .catch(err => console.error('Unable to connect to the database:', err))

const umzug = new Umzug({
  migrations: { glob: 'src/storage/migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console
})

export class User extends Model {
  declare id: number
  declare firstName: string
  declare lastName: string
  declare email: string
  declare passwordHash: string
  declare salt: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'First Name length is not correct'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Last Name length is not correct'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [5, 100],
          msg: 'Email length is not correct'
        }
      }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 129],
          msg: 'Password length is not correct'
        }
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: 'Salt length is not correct'
        }
      }
    }
  },
  { sequelize, timestamps: true }
)

enum NoteType {
  Personal,
  Work,
  Family,
  Hobby,
}

export class Note extends Model {
  declare id: number
  declare title: string
  declare text: string
  declare noteType: NoteType
  declare user_id: number
}


Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    text: {
      type: DataTypes.STRING,
      defaultValue: null
    },
    noteType: {
      type: DataTypes.ENUM('Personal', 'Work', 'Family', 'Hobby'),
      defaultValue: 'Personal',
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      },
      allowNull: false,
    }
  },
  { sequelize, timestamps: true }
)

export const runMigrations = async () => {
  await umzug.up()
}
