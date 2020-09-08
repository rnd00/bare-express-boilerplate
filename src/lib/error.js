// error definitions goes here
const ERRORS = {
  // 400
  commonError: {
    code: 400,
    internal: 400000,
    message: 'Bad Request'
  },

  // 401
  commonUnauth: {
    code: 401,
    internal: 401000,
    message: 'Unauthorized Request'
  },

  // 404
  commonNotFound: {
    code: 404,
    internal: 404000,
    message: 'Not Found'
  },

  // 405
  commonMethodNotAllowed: {
    code: 405,
    internal: 405000,
    message: 'Method is not allowed'
  },

  // 500
  commonServerError: {
    code: 500,
    internal: 500000,
    message: 'Server Error'
  }
}

class ErrorCustom extends Error {
  constructor ({ message, code, internal }) {
    super()
    this.code = code || ERRORS.commonError.code
    this.message = message || ERRORS.commonError.message
    this.internal = internal || ERRORS.commonError.internal
  }
}

const errorHandling = async (err, req, res) => {
  let { code, message, internal, stack } = err
  if (!code) {
    code = err.statusCode
    internal = parseInt(`${code}998`)
  }
  req.log.error({
    code,
    message,
    internal,
    stack
  })
  if (process.env.NODE_ENV === 'development') {
    // log everything
    console.error(err)
    await res.status(code).json({
      code,
      message,
      internal,
      stack
    })
  }
  if (process.env.NODE_ENV === 'production') {
    // default to 404
    await res.status(404).json(ERRORS.commonError)
  }
}

module.exports = {
  ERRORS,
  ErrorCustom,
  errorHandling
}
