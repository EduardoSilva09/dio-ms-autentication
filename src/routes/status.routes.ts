import { Router, Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'

const statusRoute = Router()

statusRoute.get(
  '/status',
  (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.OK).send({
      name: 'API Authentication DIO',
      version: '0.0.1',
      status: 'sucesso',
    })
  },
)

export default statusRoute
