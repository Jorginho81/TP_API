import dotenv from 'dotenv'

dotenv.config()

export const env = {
    port: process.env.PORT,
    mongoURL: process.env.MONGO_URI,
    token: process.env.TOKEN
}