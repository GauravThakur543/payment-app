const errorHandler = (err, req, res, next) => {
    res.status(400).json({err: err.issues[0].message})
}

module.exports = {errorHandler}