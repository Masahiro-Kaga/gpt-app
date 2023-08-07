require('dotenv').config();
const port = process.env.SERVER_PORT;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, ()=> console.log(`Server is running on PORT ${port}`));
