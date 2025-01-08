const express = require('express');  // Import the express module
const path = require('path');       // Import the 'path' module

const app = express();  // Create an instance of Express

// Redirect "/my-products" to "/products"
app.get('/my-products', (req, res) => {
    res.redirect(301, '/products');  // 301 is a permanent redirect
    console.log('Redirected from /my-products to /products');
});

// Serve static files from the 'views' directory
app.get('/', (req, res) => {
    const route = 'index.html';
    console.log('route ===>>', '/');
    console.log('method ===>>', req.method);
    const filePath = path.join(__dirname, 'view', route);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Error reading file');
        }
    });
});

app.get('/about', (req, res) => {
    const route = 'about.html';
    console.log('route ===>>', '/about');
    console.log('method ===>>', req.method);
    const filePath = path.join(__dirname, 'views', route);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Error reading file');
        }
    });
});

app.get('/products', (req, res) => {
    const route = 'products.html';
    console.log('route ===>>', '/products');
    console.log('method ===>>', req.method);
    
    const filePath = path.join(__dirname, 'views', route);
    
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file');
        } else {
            console.log('File sent successfully:', filePath);
        }
    });
});


app.get('/products/:id', (req, res) => {
    // Extract the dynamic part of the URL (product identifier)
    const productId = req.params.id;  // This gets the dynamic string (e.g., product id)
    console.log('Product ID:', productId);

    // Just for demonstration, serving a static product page:
    const route = 'product.html';
    console.log('route ===>>', `/products/${productId}`);
    console.log('method ===>>', req.method);
    const filePath = path.join(__dirname, 'views', route);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Error reading file');
        }
    });
});


// Handle 404 error for unknown routes
app.use((req, res) => {
    const route = '404.html';
    console.log('route ===>>', req.url);
    console.log('method ===>>', req.method);
    const filePath = path.join(__dirname, 'views', route);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send('Error reading file');
        }
    });
});

// Start the server and listen for incoming requests
const PORT = 3000;  // Define the port number on which the server will listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
