const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
  };
  
  module.exports = notFoundMiddleware;
  