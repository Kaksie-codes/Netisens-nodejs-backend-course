const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model');

const app = express();

app.use(express.json());

// Create new product
app.post('/api/products', async(req, res) => {
    console.log('request body >>>', req.body);
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(200).json({msg: "Product created successfully"})
    } catch (error) {
        res.status(500).json({msg:error.message});
    }   
})

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({count: products.length, products});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
    console.log('Request params >>>', req.params);
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

        res.status(200).json({msg: 'product updated successfully',product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect('mongodb+srv://agba_coder:admin001@netisensdb.l0dgp.mongodb.net/netisens-API?retryWrites=true&w=majority&appName=netisensDB')
.then(() => {
    console.log('Database conmnected Successfully');
    app.listen(3000, () => {
        console.log('server is running on http://localhost:3000')
    })
})
.catch((error) => console.log('Error connecting to Database', error))
