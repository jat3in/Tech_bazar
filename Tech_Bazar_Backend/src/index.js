// require('dotenv').config({path: './env'})

import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { DB_NAME } from './constant.js'

dotenv.config()

connectDB()