const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const foursquareRoutes = require("./routes/fsq");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));


// Example route
app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/foursquare", foursquareRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
