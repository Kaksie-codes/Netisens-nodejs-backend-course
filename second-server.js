const http = require('http');  // Import the 'http' module for creating an HTTP server
const url = require('url');    // Import the 'url' module to parse and handle URLs
const fs = require('fs');      // Import the 'fs' (File System) module for reading files
const path = require('path');  // Import the 'path' module

// Create a server with route handling and JSON support
const server = http.createServer((req, res) => {   

    let route;
    let filePath = '';

    // Parse the URL and extract the pathname
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    console.log('parsed url', parsedUrl)


     // Redirect "/my-products" to "/products"
     if (pathname === '/my-products') {
        res.writeHead(301, { 'Location': '/products' }); // 301 is a permanent redirect
        res.end(); // End the response
        return; // Stop further processing
    }

    // Serve static files from the 'views' directory for the index page
    if (pathname === '/') {
        route = 'index.html';
        console.log('route ===>>', pathname );
        console.log('method ===>>', req.method);
        filePath = path.join(__dirname, 'views', route);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathname === '/about') {
        route = 'about.html';
        console.log('route ===>>', pathname );
        console.log('method ===>>', req.method);
        filePath = path.join(__dirname, 'views', route);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathname === '/products') {
        route = 'products.html';
        console.log('route ===>>', pathname );
        console.log('method ===>>', req.method);
        filePath = path.join(__dirname, 'views', route);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else if (pathname.startsWith('/products/')) {
        // Extract the dynamic part of the URL (product identifier)
        const productId = pathname.split('/')[2];  // This gets the dynamic string (e.g., product id)

        // You can use `productId` to load data or display specific content for that product
        console.log('Product ID:', productId);

        // Here, just for demonstration, serving a static product page:
        route = 'product.html';
        console.log('route ===>>', pathname );
        console.log('method ===>>', req.method);
        filePath = path.join(__dirname, 'views', route);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    } else {
        // Handle 404 error for unknown routes
        route = '404.html';
        console.log('route ===>>', pathname );
        console.log('method ===>>', req.method);
        filePath = path.join(__dirname, 'views', route);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Error reading file');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });
    }
});

// Start the server and listen for incoming requests
const PORT = 3000;  // Define the port number on which the server will listen
server.listen(PORT, () => {
    // Once the server is successfully running, log a message to the console
    console.log(`Server is running on http://localhost:${PORT}`);
});
