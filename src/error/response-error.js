class ResponseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

class ValidationError extends Error {
    constructor(status, details) {
      super('Validation Error');
      this.details = details;
    //   this.errors = Array.isArray(errors) ? errors : [];
      this.status = status;
    }
  
    formatErrors() {
      return this.details.map(error => ({
        field: error.path.join('.'),
        message: error.message
      }));
    }
  }
  
export {
    ResponseError,
    ValidationError
}