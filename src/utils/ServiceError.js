class ServiceError extends Error {
  constructor(error, info = '') {
    super();
    this.status = error?.response?.status;
    this.name = this.constructor.name;
    this.info = info;
    this.pureMessage = error.message;
    this.message = `${error.message} | ${info}`;
  }
}

export default ServiceError;
