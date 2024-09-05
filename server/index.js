import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import eventRoutes from './routes/eventRoutes.js';
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 5000;

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(json());

// Connect to MongoDB using mongoose.connect
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB', error));

// Define your routes here

app.use('/events', eventRoutes);
app.get("/events", (req, res) => {
  res.json("Hii");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
