module.exports = class UniqueError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};
