import express from 'express'
import myRoutes from './routes/index'
import morgan from 'morgan'
 const app = express()


app.use(express.json())
app.use(morgan('dev'))
app.use(myRoutes)
export default app