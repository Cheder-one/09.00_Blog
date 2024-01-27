class ServiceError extends Error {
  constructor(error, info = '') {
    super();
    this.status = error?.response?.status;
    this.name = this.constructor.name;
    this.info = info;
    this.pureMessage = error.message;
    this.message = `${error.message} | ${info}`;
    // Error.captureStackTrace(this, this.constructor);
    this.stack = error.stack;
  }
}

export default ServiceError;
