import 'dotenv/config';

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json({limit: '8mb'}));
app.use(express.static('static'));

app.use(cors({
    origin: '',
    credentials: true
}));

import userRoutes from "./routes/userRoutes.js";
app.use('/user', userRoutes);

app.listen(PORT, ()=>{
  console.log(`Server ON || Hosted on: http://localhost:${PORT}`)
});
