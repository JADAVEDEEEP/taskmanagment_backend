const express = require('express');
const authmiddleware = require('../middleware/authmiddleware');
const { gettask, createtask,gettaskbyid ,updatetask,deletetask} = require('../controller/taskcontroller');
const taskrouter = express.Router();
//for the protecd routes to authnticate and authrize the user 
taskrouter.use(authmiddleware);
//this get rote wil retrun tehe taskdata to te client 
taskrouter.get('/get-task',gettask);
//this get rote wil retrun tehe taskdata by userid to te client
taskrouter.get('/get-task/:id', gettaskbyid)
//this post rote wil store taskdata in to the task model for the client
taskrouter.post('/post-task',createtask)
//this put route will updtee the task databy user id in to to the task model for the client
taskrouter.put('/update-task/:id', updatetask)
//this delete route will remove the task data by user id in to to the task model for the client
taskrouter.delete('/delete-task/:id', deletetask)


module.exports = taskrouter;
