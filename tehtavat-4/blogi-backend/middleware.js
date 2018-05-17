const tokenextractor = (request, response, next) => {
  const authorization = request.get('authorization')
  try {
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7)
    }
  } catch (exception) {
    response.status(401).json({error:'no token'})
  }  
  next()
}

module.exports = tokenextractor