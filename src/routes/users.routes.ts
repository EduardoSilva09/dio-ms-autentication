import { Router, Request, Response, NextFunction } from 'express'

// get  /users
// get  /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const userRoute = Router()

userRoute.get('/users', (req: Request, res: Response, next: NextFunction) => {
  const users = [{ userName: 'eduardo' }]
  res.send(users)
})

userRoute.get(
  '/users:uuid',
  (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid
    res.sendStatus(200)
  },
)

export default userRoute