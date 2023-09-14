const httpStatus = require("http-status");
const config = require('../config/config');
const ApiError = require("../utils/ApiError");

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && {stack: err.stack}),
    };
    if(process.env.NODE_ENV === 'development') {
        console.error(err);
    }

    res.status(statusCode).send(response);
};

module.exports = {
    errorHandler,
};