const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./routes/uploadRoutes"); // Ensure this is correctly imported

const app = express(); // Define app BEFORE using app.use()

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (so uploaded files are accessible)
app.use("/uploads", express.static("uploads"));

// Register Routes
app.use("/api/document/upload", uploadRoutes); // Now app is defined before use

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use("/api/document/upload", uploadRoutes);
app.use("/uploads", express.static("uploads"));
