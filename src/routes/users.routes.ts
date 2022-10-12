import { Router } from 'express'

// get  /users
// get  /users/:uuid
// post /users
// put /users/:uuid
// delete /users/:uuid

const userRoute = Router()

userRoute.get('/users', (req, res, next) => {
  const users = [{ userName: 'eduardo' }]
  res.send(users)
})

export default userRoute
