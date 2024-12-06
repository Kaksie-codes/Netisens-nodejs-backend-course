// custom modules
const {add, multiply} = require('./math');
// const math = require('./math');
// const {add} = math;




// console.log('math object =====>>>', math)


// common core modules
// const os = require("os");
// const path = require("path");
// const fs = require("fs");

// third party modules
const { v4:uuid} = require('uuid');

// // console.log(global);

// console.log(__dirname)
// console.log(__filename)
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));
// console.log(path.join(__dirname, 'index.html'));


// console.log(os.type());
// 'Linux': For Linux-based systems
// 'Darwin': For macOS
// 'Windows_NT': For Windows
// console.log(os.homedir());


console.log(uuid()) 


// console.log("Sum:", add(3, 5));
// console.log("Product:", multiply(3, 5));

