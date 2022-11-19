import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const mongooseConection = async () : Promise<void> => {
  
    try {
        const db = await mongoose.connect(`${process.env.Mongo_DB_URL}` )
        const host : string = db.connection.host
        const port : number = db.connection.port
        const url = `${host}:${port}`
             console.log(`mongo DB conectado en : ${url}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default mongooseConection