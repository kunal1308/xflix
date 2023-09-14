const express = require("express");
const httpStatus = require('http-status');
const {errorHandler} = require("./middlewares/error");
const routes = require('./routes/v1');


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use("/v1", routes)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

app.use(errorHandler);

module.exports = app;