class ApiError extends Error{
    constructor(statusCode,message="something went wrong"){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.data = null
        this.success = flase
        this.errors = [];

        Error.captureStackTrace(this, this.constructor);
    }
}

export {ApiError}