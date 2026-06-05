const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginuser } = require('../controller/usercontroller');

const userrouter = express.Router();
//this get route is retruning the user data to the client
userrouter.get('/get-user',getAllUsers)
//this get route is retruning the user data to the client by id
userrouter.get('/get-user/:id',getUserById)
//this post route is creating the user data to the database
userrouter.post('/post-user',createUser)
//this put route is updating the user data to the database by id
userrouter.put('/update-user/:id', updateUser)
//this delete route is deleting the user data from the database by id
userrouter.delete('/delete-user/:id', deleteUser)
//this post route is login the user and return the token to the client  
userrouter.post('/login-user',loginuser)

module.exports = userrouter;