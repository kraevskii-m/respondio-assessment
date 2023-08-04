import { User } from '../../src/storage/db'
import { ValidationError } from 'sequelize'

describe('user unit tests', () => {
  describe('model', () => {
    it('Cant create User with empty or no first name', async () => {
      const newUserEmpty = async () => {
        await User.create({
          firstName: "",
          lastName: "Last",
          email: "user@gmail.com",
          passwordHash: "gagdag",
          salt: "adjngl",
        })
      }
      const newUserNoFirstName = async () => {
        await User.create({
          lastName: "Last",
          email: "user@gmail.com",
          passwordHash: "gagdag",
          salt: "adjngl",
        })
      }

      await expect(newUserEmpty).rejects.toThrow(ValidationError)
      await expect(newUserNoFirstName).rejects.toThrow(ValidationError)
    })
    it('Cant create User with empty or no last name', async () => {
      const newUserEmpty = async () => {
        await User.create({
          firstName: "First",
          lastName: "",
          email: "user@gmail.com",
          passwordHash: "gagdag",
          salt: "adjngl",
        })
      }

      const newUserNoLastName = async () => {
        await User.create({
          firstName: "First",
          email: "user@gmail.com",
          passwordHash: "gagdag",
          salt: "adjngl",
        })
      }

      await expect(newUserEmpty).rejects.toThrow(ValidationError)
      await expect(newUserNoLastName).rejects.toThrow(ValidationError)
    })
    it('Cant create User with empty or no email', async () => {
      const newUserEmpty = async () => {
        await User.create({
          firstName: "First",
          lastName: "Last",
          email: "",
          passwordHash: "gagdag",
          salt: "adjngl",
        })
      }

      const newUserNoEmail = async () => {
        await User.create({
          firstName: "First",
          lastName: "Last",
          passwordHash: "gagdag",
          salt: "adjngl",
        })
      }

      await expect(newUserEmpty).rejects.toThrow(ValidationError)
      await expect(newUserNoEmail).rejects.toThrow(ValidationError)
    })

  })
})
