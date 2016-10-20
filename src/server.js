let project_name = "MyProfile"
import express from 'express'
let app = express()
import http from 'http'
let server = http.createServer(app)
import path from 'path'
import bodyParser from 'body-parser'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

import routes from './app/routes'
routes(app)

server.listen(process.env.PORT | 2000,  () => {
  console.log(project_name + " is listening on " + server.address().port)
})
