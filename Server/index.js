import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import route from './Routes.js/index.js'
import { DATABASE_URL, PORT } from './config.js'

const app = express()
app.use(express.json({limit:'30mb',extended:true}))
app.use(morgan('dev'))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(cors())
app.use(express.static('public'))
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));

app.use('/',route)

mongoose.connect(DATABASE_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
 
app.listen(PORT,()=>{
  console.log(`express app listening on port ${PORT}` );
})
}).catch((error)=>{console.log(`${error} did not connect`);})

