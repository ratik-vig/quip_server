const errorHandler = (err, req, res, next) => {
  const error = JSON.parse(err.message);
  const errorCode = error.statusCode || 500;
  res.status(errorCode).send(error);
  next();
};

module.exports = errorHandler;
