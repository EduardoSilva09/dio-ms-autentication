import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import userRepository from '../repositories/user.repository'

// get  /users
// get  /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const userRoute = Router()

userRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAllUsers()
  res.send(users)
})

userRoute.get(
  '/users:uuid',
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    res.sendStatus(StatusCodes.OK)
  },
)

userRoute.post('/users', (req: Request, res: Response, next: NextFunction) => {
  const newUser = req.body
  res.status(StatusCodes.CREATED).send(newUser)
})

userRoute.put(
  '/users/uuid',
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    res.sendStatus(StatusCodes.OK)
  },
)

export default userRoute
