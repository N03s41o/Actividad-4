const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
require("dotenv").config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "views")));

// Ruta raíz -> mostrar login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

module.exports = app;