const express = require('express');
const cors = require('cors');
const app = express();

// Load environment variables
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

//middlewares
app.use(cors({
    origin:FRONTEND_URL , // Adjust this to your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes


module.exports = app;