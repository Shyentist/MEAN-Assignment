const { Schema, model } = require('mongoose');

const productSchema = new Schema({ 
    name: { type: String, required: true, default: "No name given" },
    details: { type: String, required: true, default: "No details given" },
    sku: { type: String, required: true, unique: true },
    category: { type: String, enum: ["hats", "t-shirts", "trousers", "jackets", "hoodies", "shoes"], required: true, default: "shoes" },
    tags: { type: [String], default: []},
    price: { type: Number, required: true, default: 0},
    img: { type: String, required: true, default: "undefined.jpg" }
});

const Product = model('Product', productSchema);

module.exports = { productSchema, Product };