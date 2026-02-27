const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo productos" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const product = new Product({
      name,
      price,
      description
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creando producto" });
  }
};