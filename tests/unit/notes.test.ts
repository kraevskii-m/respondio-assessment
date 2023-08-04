import { User } from '../../src/storage/model/user'

describe('note unit tests', () => {
  describe('model', () => {
    it('Note must have user reference', async () => {})
    it('Cant create Note with wrong user id', async () => {
      const userWithTopId = await User.max('id')
      console.log(userWithTopId)
    })
  })
})
