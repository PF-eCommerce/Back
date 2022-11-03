import express from 'express'
import myRoutes from './routes/index'
 const app = express()


app.use(express.json())
app.use(myRoutes)
export default app