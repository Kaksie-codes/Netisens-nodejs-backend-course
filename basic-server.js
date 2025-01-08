const fs = require('fs');
const http = require('http');
const path = require('path');

// Step 1: Import the 'http' module
// --- The 'http' module is a built-in Node.js module that allows us to create an HTTP server.
// --- This module enables handling requests and sending responses over the HTTP protocol.



const server = http.createServer((req, res) => {
    // Step 2: Use 'http.createServer()' to create the server
    // --- The 'createServer()' method takes a callback function with two arguments:
    //     - 'req' (short for "request") contains details about the client's request.
    //     - 'res' (short for "response") is used to send a response back to the client.
    
    console.log("method ===>>", req.method)
    console.log("path ===>>", req.url)

    res.statusCode = 200;
    // --- Set the HTTP status code to 200, which means "OK" (successful request).
    // --- This tells the client that the request was successful.

    // res.setHeader('Content-Type', 'text/plain');
    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Content-Type', 'application/json');
    // --- Set a response header to indicate the type of content being returned.
    // --- 'Content-Type: text/plain' means the response is plain text.

    // res.write("Angelic Boy");
    // res.write("<h1>Angelic Boy</h1>");
    // let _path = path.join(__dirname, 'views', 'index.html')
    // console.log('file-path ==>', _path);
    // fs.readFile(_path, (err, data) => {
    //     if (err) {
    //         res.statusCode = 500;
    //         res.end('Error reading file');
    //     } else {
    //         res.write(data);
    //         res.end();
    //         // res.end(data);
    //     }
    // })
    // res.end();

    // res.end('Hello, World!');

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Hello, World!' }));

    // --- Send the response body and end the response process.
    // --- 'res.end()' must always be called to finalize the response.
    // --- The string 'Hello, World!' will be sent to the client as the response content.
});

// Step 3: Start the server and listen for incoming requests
const PORT = 3000;
// --- Define the port number on which the server will listen for requests.
// --- Port 3000 is commonly used for development purposes.

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    // --- Start the server and listen on the defined port.
    // --- The callback function logs a message when the server starts successfully.
});
