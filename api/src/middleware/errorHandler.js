class ApplicationError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode || 500
    Error.captureStackTrace(this, this.constructor)
  }
}

function errorHandler (err, req, res, next) {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        name: err.name,
        message: err.message
      }
    })
  }

  res.status(500).json({
    success: false,
    error: {
      name: err.name,
      message: err.message,
      ...(process.env.NODE_ENV === 'test' ? { stack: err.stack } : {})
    }
  })
}

module.exports = {
  ApplicationError,
  errorHandler
};
