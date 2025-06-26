const express = require('express');
const mongoose =require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const router = require('./routes');
dotenv.config();

connectDB();
const app = express();


const allowedOrigins = [
  'https://nexus-one-dun.vercel.app',
  'http://localhost:5173',
  "*" 
];

  
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || origin === undefined) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
    optionsSuccessStatus: 200
  }));

app.use('/api/v1', router)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running  on port ${PORT}`));
