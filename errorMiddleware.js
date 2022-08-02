const errorMiddleware = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: err.message });
}

module.exports = errorMiddleware;