const express = require('express');
const authmiddleware = require('../middleware/authmiddleware');
const { gettask, createtask,gettaskbyid ,updatetask,deletetask} = require('../controller/taskcontroller');
const taskrouter = express.Router();

taskrouter.use(authmiddleware);

taskrouter.get('/get-task',gettask);

taskrouter.get('/get-task/:id', gettaskbyid)

taskrouter.post('/post-task',createtask)

taskrouter.put('/update-task/:id', updatetask)

taskrouter.delete('/delete-task/:id', deletetask)


module.exports = taskrouter;
