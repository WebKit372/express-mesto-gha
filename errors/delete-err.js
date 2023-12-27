module.exports = class DeleteError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};
