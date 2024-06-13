import express from 'express'
import cors from 'cors'
import reqResInspector from 'express-req-res-inspector'

import apiRoutes from './routes/index'

const app = express()

app.use(express.static('uploads'))
app.use(express.json({ limit: '100mb' }))
app.use(cors())
app.use(reqResInspector())

app.use('/api/v1', apiRoutes)

export default app
