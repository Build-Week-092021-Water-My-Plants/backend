const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const plantRouter = require('./plants/plants-router')
const restricted = require('./auth/auth-restricted')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())


server.use('/api/auth', authRouter)
server.use('/api/users', restricted, usersRouter)
server.use('/api/plants', plantRouter)



server.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    })
})

module.exports = server