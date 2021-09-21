const express = require('express')
const db = require('./data/db-config')

function getAllUsers(){
    return db('users')
}

async function insertUser(user){
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username', 'password'])
    return newUserObject
}

const server = express()
server.use(express.json())


server.get('/api/users', async (req, res)=>{
    res.json(await getAllUsers())
})

server.post('/api/users', async (req, res)=>{
    res.status(201).json(await insertUser(req.body))
})


module.exports = server