import express, { response } from 'express'
import cors from 'cors'
import connectDB from './config/db.config.js'
import dotenv from 'dotenv'
import path from './routes/user.route.js'
import way from './routes/agent.route.js'
import route from './routes/list.route.js'
import task from './routes/task.route.js'

dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
connectDB()

app.use('/admin',path)
app.use('/agent',way)
app.use('/file',route)
app.use('/task',task)

const PORT = process.env.PORT || 2000
app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
    
})