const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false}));

const apiRouter = require('./routers/api');

app.use('/api/v1' , apiRouter);

const port = process.env.port || 4000;
app.listen(port , () => console.log(`Now serving it hot hot on port ${port}`));