// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Manga = require("./models/Manga");

// require("dotenv").config();



// // Initialize the app
// const app = express();
// const PORT = process.env.PORT || 3010;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose
//   .connect( "mongodb+srv://umer1abddullah15:UMERTorch@mangamango.u0jp9.mongodb.net/" )
//   .then(() => {
//     console.log("MongoDB connected!");
//     console.log(
//       "Connected to database: ${mongoose.connection.db.databaseName}"
//     );
//   })
//   .catch((err) => console.error("MongoDB connection error:", err));

// // API Routes
// app.get("/api/mangas", async (req, res) => {
//   try {
//     const mangas = await Manga.find();
//     res.json(mangas);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching mangas" });
//   }
// });

// // Start the server
// app.listen(PORT, () => console.log("Server running on port ${PORT}"));







// server.js

const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
