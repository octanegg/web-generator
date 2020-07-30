require("dotenv").config();
const express = require('express');
const morgan = require('morgan');
const rfs = require("rotating-file-stream");
const path = require("path");

const app = express();

const accessLogStream = rfs.createStream('access.log', { interval: "1d", path: path.join(__dirname, "logs") });
app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static('dist'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
