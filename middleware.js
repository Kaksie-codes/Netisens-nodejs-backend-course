// A middleware is basically any code which runs on the server between getting a request and sending a response

const http = require('http');  // Import the 'http' module for creating an HTTP server
const url = require('url');    // Import the 'url' module to parse and handle URLs
const fs = require('fs');      // Import the 'fs' (File System) module for reading files

// Step 1: Create a custom middleware to log request details
function logRequest(req, res, next) {
    // Middleware function logs the HTTP method and the URL of the incoming request
    console.log(`${req.method} request to ${req.url}`);
    next();  // Calls the next middleware or route handler in the chain
}

// Step 2: Create a server with route handling and JSON support
const server = http.createServer((req, res) => {
    // The server is created using http.createServer(), which takes a callback function 
    // that handles the request (req) and sends the response (res).
    
    // Log the request details by calling the logRequest middleware
    logRequest(req, res, () => {
        // Parse the URL of the incoming request and extract the pathname and query parameters
        const parsedUrl = url.parse(req.url, true);
        const method = req.method;  // Get the HTTP method of the request (e.g., GET, POST)
        const route = parsedUrl.pathname;  // Extract the route from the URL (e.g., '/hello')

        // Set default headers for the response, specifying that we are returning JSON
        res.setHeader('Content-Type', 'application/json');

        // Step 3: Handle different routes and HTTP methods
        if (route === '/' && method === 'GET') {
            // Handle GET requests to the root ("/") route
            res.statusCode = 200;  // Set the HTTP status code to 200 (OK)
            res.end(JSON.stringify({ message: 'Welcome to the Node.js Server!' }));  // Send a JSON response
        } else if (route === '/hello' && method === 'GET') {
            // Handle GET requests to the "/hello" route
            res.statusCode = 200;
            res.end(JSON.stringify({ message: 'Hello, World!' }));  // Send a simple greeting message
        } else if (route === '/api/data' && method === 'GET') {
            // Handle GET requests to the "/api/data" route, simulating fetching data
            res.statusCode = 200;
            res.end(JSON.stringify({ data: ['apple', 'banana', 'cherry'] }));  // Send sample data as JSON
        } else if (route === '/api/submit' && method === 'POST') {
            // Handle POST requests to the "/api/submit" route
            let body = '';  // Initialize an empty string to collect the request body data
            req.on('data', chunk => {
                body += chunk;  // Accumulate the request body data in chunks
            });

            req.on('end', () => {
                // Once all data is received, parse the JSON body and send a response
                const parsedBody = JSON.parse(body);
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Data received', receivedData: parsedBody }));  // Send back received data
            });
        } else if (route === '/static' && method === 'GET') {
            // Handle GET requests to the "/static" route, which serves static files like text or image files
            fs.readFile('public/hello.txt', 'utf8', (err, data) => {
                // Read a text file from the 'public' directory
                if (err) {
                    // If there's an error (e.g., file not found), respond with an error message
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: 'File not found' }));
                } else {
                    // If the file is successfully read, return its contents as the response
                    res.statusCode = 200;
                    res.end(data);  // Send the contents of the file as the response
                }
            });
        } else {
            // If the route does not match any of the above, return a 404 (Not Found) error
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Route not found' }));  // Return a 404 JSON error message
        }
    });
});

// Step 4: Start the server and listen for incoming requests
const PORT = 3000;  // Define the port number on which the server will listen
server.listen(PORT, () => {
    // Once the server is successfully running, log a message to the console
    console.log(`Server is running on http://localhost:${PORT}`);
});
