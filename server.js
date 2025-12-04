const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Allow Angular (4200) to talk to backend (3000)
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/bookit", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Load backend API routes
const authRoutes = require("./mean-stack-backend/routes/auth");
app.use("/api/auth", authRoutes);

// Serve Angular frontend (after building it)
const frontendPath = path.join(__dirname, "mean-stack-frontend", "dist");

app.use(express.static(frontendPath));

// Wildcard route for Angular (Express 5 compatible)
app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

