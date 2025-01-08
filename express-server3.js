const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000 

const app = express();


const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next(); 
}

const errorHandler = (err, req, res, next) => {
    res.status(404).json(err)
}

//logger middleware
app.use(logger);


app.listen(port, () => {
    console.log('Server is running on port ' + port );
})