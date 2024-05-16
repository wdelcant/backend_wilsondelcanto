export function errorHandler(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
}

export function requestLogger(req, res, next) {
  console.log(`Request received: ${req.method} ${req.url}`)
  next()
}
