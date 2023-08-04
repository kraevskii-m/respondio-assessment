import { NoteService } from '../api/generated/api/resources/note/service/NoteService'
import {
  BadRequestError,
  CreateNoteRequest,
  Forbidden,
  MessageOk,
  NoteObject,
  NotFound,
  ServerError,
  UpdateNoteRequest,
} from '../api/generated/api'
import * as e from 'express'
import { decodeToken } from './utils'
import { User } from '../storage/model/user'
import { ValidationError } from 'sequelize'
import { Note } from '../storage/model/note'

export default new NoteService({
  async all(
    req: e.Request<never, NoteObject[], never, never>,
    res: {
      send: (responseBody: NoteObject[]) => Promise<void>
      cookie: (cookie: string, value: string, options?: e.CookieOptions) => void
      locals: any
    },
  ): Promise<void> {
    const { id, email } = decodeToken(req.header('Authorization'))
    const user = await User.findOne({
      where: {
        id: id,
        email: email,
      },
    })
    if (!user) {
      throw new Forbidden()
    }
    try {
      const notes = await Note.findAll({
        where: {
          user_id: user.id,
        },
      })
      const output = notes.map((note: Note) => note.dataValues as NoteObject)
      await res.send(output)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestError()
      }
      throw new ServerError()
    }
  },
  async delete(
    req: e.Request<{ noteId: number }, MessageOk, never, never>,
    res: {
      send: (responseBody: MessageOk) => Promise<void>
      cookie: (cookie: string, value: string, options?: e.CookieOptions) => void
      locals: any
    },
  ): Promise<void> {
    const { id, email } = decodeToken(req.header('Authorization'))
    const user = await User.findOne({
      where: {
        id: id,
        email: email,
      },
    })
    if (!user) {
      throw new Forbidden()
    }
    let deletedNum
    try {
      deletedNum = await Note.destroy({
        where: {
          id: req.params.noteId,
          user_id: user.id,
        },
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestError()
      }
      throw new ServerError()
    }
    if (!deletedNum || deletedNum < 1) {
      throw new NotFound()
    }
    await res.send({ success: true })
  },
  async single(
    req: e.Request<{ noteId: number }, NoteObject, never, never>,
    res: {
      send: (responseBody: NoteObject) => Promise<void>
      cookie: (cookie: string, value: string, options?: e.CookieOptions) => void
      locals: any
    },
  ): Promise<void> {
    const { id, email } = decodeToken(req.header('Authorization'))
    const user = await User.findOne({
      where: {
        id: id,
        email: email,
      },
    })
    if (!user) {
      throw new Forbidden()
    }
    let note
    try {
      note = await Note.findOne({
        where: {
          id: req.params.noteId,
          user_id: user.id,
        },
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestError()
      }
      throw new ServerError()
    }
    if (!note) {
      throw new NotFound()
    }
    const output = note.dataValues as NoteObject
    await res.send(output)
  },
  async update(
    req: e.Request<{ noteId: number }, MessageOk, UpdateNoteRequest, never>,
    res: {
      send: (responseBody: MessageOk) => Promise<void>
      cookie: (cookie: string, value: string, options?: e.CookieOptions) => void
      locals: any
    },
  ): Promise<void> {
    const { id, email } = decodeToken(req.header('Authorization'))
    const user = await User.findOne({
      where: {
        id: id,
        email: email,
      },
    })
    if (!user) {
      throw new Forbidden()
    }
    let updatedNum: number
    try {
      const update = await Note.update(
        {
          title: req.body.title,
          text: req.body.text,
          noteType: req.body.noteType,
          user_id: user.id,
        },
        {
          where: {
            id: req.params.noteId,
            user_id: id,
          },
        },
      )
      updatedNum = update[0]
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestError()
      }
      throw new ServerError()
    }
    if (!updatedNum || updatedNum < 1) {
      throw new NotFound()
    }
    await res.send({ success: true })
  },
  async create(
    req: e.Request<never, NoteObject, CreateNoteRequest, never>,
    res: {
      send: (responseBody: NoteObject) => Promise<void>
      cookie: (cookie: string, value: string, options?: e.CookieOptions) => void
      locals: any
    },
  ): Promise<void> {
    const { id, email } = decodeToken(req.header('Authorization'))
    const user = await User.findOne({
      where: {
        id: id,
        email: email,
      },
    })
    if (!user) {
      throw new Forbidden()
    }
    try {
      const note = await Note.create({
        title: req.body.title,
        text: req.body.text,
        noteType: req.body.noteType,
        user_id: user.id,
      })
      const output = note.dataValues as NoteObject
      await res.send(output)
    } catch (error) {
      if (error instanceof ValidationError) {
        throw new BadRequestError()
      }
      throw new ServerError()
    }
  },
})
