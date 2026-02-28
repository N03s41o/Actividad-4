const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const Product = require("./models/Product");

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (login.html y products.html)
app.use(express.static(path.join(__dirname, "views")));

// Ruta raíz -> mostrar login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Rutas API
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

/* =========================
   Producto por defecto (Seed)
========================= */
async function seedProduct() {
  try {
    const count = await Product.countDocuments();

    if (count === 0) {
      await Product.create({
        name: "Producto Inicial",
        price: 999,
        description: "Producto creado automáticamente"
      });

      console.log("Producto por defecto creado");
    }
  } catch (error) {
    console.log("Error en seed:", error.message);
  }
}

seedProduct();

module.exports = app;