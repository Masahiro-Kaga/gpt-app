import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

import imageGeneratorRoute from './routers/imageGenerator';

app.use(cors());
app.use(express.json());

app.use('/imageGenerator', imageGeneratorRoute);

app.listen(port, () => console.log(`Server is running on PORT ${port}`));
