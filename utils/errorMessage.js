const errorMessage = function(res, statusCode, error){
    res.status(statusCode).json({
        error
    })
}

module.exports = errorMessage