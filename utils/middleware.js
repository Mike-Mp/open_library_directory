const logger = (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`
      path: ${req.path}
      body: ${req.body}
    `);
  }

  next();
};

module.exports = {
  logger,
};
