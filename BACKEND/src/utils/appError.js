
export default class AppError extends Error{

    constructor(message,code){
        super(message)
        this.isOperational = true,
        this.statusCode = code || 500
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
  constructor(message = "Invalid input data") {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401);
  }
}


export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict error") {
    super(message, 409);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed") {
    super(message, 500);
  }
}