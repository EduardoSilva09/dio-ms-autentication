import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DatabaseError } from '../Models/errors/database.error.model'
import userRepository from '../repositories/user.repository'

// get  /users
// get  /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const userRoute = Router()

userRoute.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userRepository.findAllUsers()
      res.send(users)
    } catch (error) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  },
)

userRoute.get(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid
      const user = await userRepository.findById(uuid)
      res.status(StatusCodes.OK).send(user)
    } catch (error) {
      if (error instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST)
      } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
      }
    }
  },
)

userRoute.post(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = req.body
      const uuid = await userRepository.create(newUser)
      res.status(StatusCodes.CREATED).send(uuid)
    } catch (error) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  },
)

userRoute.put(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid
      const modifiedUser = req.body
      modifiedUser.uuid = uuid

      await userRepository.update(modifiedUser)
      res.sendStatus(StatusCodes.OK)
    } catch (error) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  },
)

userRoute.delete(
  '/users/:uuid',
  async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
      const uuid = req.params.uuid

      await userRepository.remove(uuid)
      res.sendStatus(StatusCodes.OK)
    } catch (error) {
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
    }
  },
)

export default userRoute
