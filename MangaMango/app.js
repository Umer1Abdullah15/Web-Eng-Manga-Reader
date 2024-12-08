const express = require('express');
// const connectDB = require('./config/db');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require("./routes/userRoutes");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const errorMiddleware = require('./middlewares/errorMiddleware');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware');


const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use('/api/admin', adminRoutes);
app.use("/api/users", userRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

