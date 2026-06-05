const express = require('express');
require('dotenv').config();

const userrouter = require('./routes/userroute');
const taskrouter = require('./routes/taskroute');
const PORT = process.env.PORT || 3000;

const connectDB = require('./config/dbconnection');
//application object alos instance of express that provide rotueing middware and sevrer method 
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    const allowedOrigins = [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((origin) => origin.trim()) : [])
    ];
    const requestOrigin = req.headers.origin;

    if (allowedOrigins.includes(requestOrigin)) {
        res.header('Access-Control-Allow-Origin', requestOrigin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Task Management API is running' });
});

//impor the userroute with middleware verification this will idenfiy which api it is if its the user api that it will move forward that req to the user route 
app.use('/userapi',userrouter);
app.use('/taskapi',taskrouter);

//this middlware fuction is retrining the global error to the client that route not match with any api req 
app.use((req,res)=>{
    res.status(404).json({error:'Route not found'})
})
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
