
export const queryParseMiddleware = arrayFieldNumber => async (req, res, next) => {
  // Cast all number in query data to number type instead of string
  for (const key in req.query) {
    if (arrayFieldNumber.indexOf(key) !== -1) {
      req.query[key] = Number(req.query[key])
    }
  }
  next()
};
