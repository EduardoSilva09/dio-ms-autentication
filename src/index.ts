import express, { Request, Response, NextFunction } from 'express'
import userRoute from './routes/users.routes'

const app = express()
app.use(express.json())

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.send({ foo: 'bar' })
})
app.use(userRoute)

app.listen(3000, () => {
  console.log('Aplicação executando na porta 3000')
})
