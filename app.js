const express = require("express");
const cors = require("cors"); // ✅ Import cors
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const contactRoutes = require("./src/routes/contactRoutes");

const app = express();

// ✅ Use cors middleware
app.use(cors({
  origin: "*", // ✅ Your frontend URL
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Routes
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
