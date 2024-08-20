
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const message = err.message ? err.message : 'Internal server error'
  return res.status(statusCode).send({ message: { message } });
};

module.exports = errorHandler;