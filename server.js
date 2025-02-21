const express = require("express");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database.js");
const mappingRoutes = require("./routes/Mapping.routes.js");

dotenv.config();

const app = express();

app.use(express.json());

// Routes
app.use("/api", mappingRoutes);

// Connect to Database and Sync
connectDB();

// Start Server
const PORT = process.env.PORT || 5000;
app.get('/', (req,res) => {
    res.send('Server is running');
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
