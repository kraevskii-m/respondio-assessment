import { User } from '../../src/storage/db'
import { Note } from '../../src/storage/db'
import { ForeignKeyConstraintError, ValidationError } from 'sequelize'

describe('note unit tests', () => {
  describe('model', () => {
    it('Note must have user reference', async () => {
      const newNote = async () => {
        await Note.create({
          title: 'title',
          text: 'text',
          noteType: 'Personal',
        })
      }

      await expect(newNote).rejects.toThrow(ValidationError)
    })
    it('Cant create Note with wrong user id', async () => {
      const userWithTopId = await User.max('id') as number | null
      const notExistingId = userWithTopId ? userWithTopId + 1 : 1

      const newNote = async () => {
        await Note.create({
          title: 'title',
          text: 'text',
          noteType: 'Personal',
          user_id: notExistingId
        })
      }

      await expect(newNote).rejects.toThrow(ForeignKeyConstraintError)
    })
  })
})
