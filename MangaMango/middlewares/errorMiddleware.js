// middlewares/errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
};

module.exports = errorMiddleware;
