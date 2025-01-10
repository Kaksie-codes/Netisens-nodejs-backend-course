const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');

const app = express();
app.use(express.json());

// Create a new product
app.post('/api/products', async (req, res) => {
    console.log(req.body);
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Update a product by ID (simplified approach)
app.put('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update the fields manually
        Object.keys(req.body).forEach(key => {
            product[key] = req.body[key];
        });

        // Save the updated product
        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


// Delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

const PORT = 3000;

mongoose.connect('mongodb+srv://netisens:netisens123@netisensdb.ntt9s.mongodb.net/Netisens-API?retryWrites=true&w=majority&appName=NetisensDB')
    .then(() => {
        console.log('Connected to Database!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error => console.error('Error connecting to Database:', error));
