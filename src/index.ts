require('dotenv').config()
import express from 'express'
import errorHandler from './middlewares/error.handler.middleware'
import statusRoute from './routes/status.routes'
import userRoute from './routes/users.routes'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRoute)
app.use(statusRoute)

app.use(errorHandler)

app.listen(3000, () => {
  console.log('Aplicação executando na porta 3000')
})
