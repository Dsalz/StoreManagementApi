const express = require('express');
const bodyParser = require("body-parser");
const app = express();

const apiRouter = require('./routers/api');

app.use(bodyParser.json());
app.use('/api/v1' , apiRouter);

const port = process.env.port || 4000;
app.listen(port , () => console.log(`Now serving it hot hot on port ${port}`));