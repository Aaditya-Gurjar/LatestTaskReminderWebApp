
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import './utils/scheduler.js'
import taskRoutes from './routes/task.route.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 8000;
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database');
    } catch (error) {
        console.log(error);

    }
}
connectDb()
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/api/v1/task", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});