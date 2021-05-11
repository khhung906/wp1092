import express from 'express'
import cors from 'cors'
import path from 'path'
import winston from 'winston'
const { splat, combine, timestamp, printf } = winston.format;

import guessRoute from './routes/guess'
import { time } from 'console'

const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

var m = new Date();
var dateString = m.getUTCFullYear() + "-" + (m.getUTCMonth() + 1) + "-" + m.getUTCDate() + "-" + (m.getUTCHours() + 8) + "-" + m.getUTCMinutes() + "-" + m.getUTCSeconds();

const myFormat = printf(({ timestamp, message}) => {
  return `${message} \t ${new Date(timestamp)}  `;
});

const logConfiguration = {
  format: combine(
    timestamp(),
    myFormat
  ),
  'transports': [
    new winston.transports.File({
      filename: `./logs/log-example-${dateString}.log`
    })
  ]
}
const logger = winston.createLogger(logConfiguration)
const logMessage = (msg) => {
  logger.log('info', msg )
    // time: dateString
}

// define routes
app.use('/api/guess', guessRoute)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')

  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
})

export {logMessage}