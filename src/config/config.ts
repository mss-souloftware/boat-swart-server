/* eslint-disable @typescript-eslint/no-non-null-assertion */

import env from 'dotenv'
import path from 'path'

const envFile = process.env.NODE_ENV !== undefined ? `.env.${process.env.NODE_ENV}` : '.env'

env.config({
  path: path.join(__dirname, `../../${envFile}`)
})

const config = {
  PORT: process.env.PORT!,
  FRONTEND_URL: process.env.FRONTEND_URL!,
  BACKEND_URL: process.env.BACKEND_URL!,
  JWT_SECRET: process.env.JWT_SECRET!
}

export default config
