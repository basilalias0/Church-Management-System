const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors')
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const router = require('./routes');
dotenv.config();

connectDB();
app.use(cors({
    origin: ['http://localhost:5173'],
    optionsSuccessStatus:200
}))



app.use('/api/v1', router)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));