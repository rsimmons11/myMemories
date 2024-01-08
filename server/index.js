
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import flash from 'express-flash';
import cors from 'cors';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: `${__dirname}/config/.env`
});

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();


app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use(flash());

app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/', (req, res) => {
  res.send('APP IS RUNNING')
})

const PORT = process.env.PORT|| 5000;

console.log('Connection URL:', process.env.CONNECTION_URL);
console.log('PORT:', PORT);

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

