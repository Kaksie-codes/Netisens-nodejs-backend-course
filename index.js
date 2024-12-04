console.log("Hello World");
// console.log(global);

const os = require("os");
const path = require("path");
const fs = require("fs");
const {add, multiply} = require('./math');
// const { v4:uuid} = require('uuid');




console.log(uuid())
// console.log("Operating System:", os.platform());
// console.log(os.type());
// console.log(os.homedir());

console.log(__dirname);
console.log(__filename);
// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.extname(__filename));
// console.log(path.parse(__filename));

// console.log("Sum:", add(3, 5));
console.log("Product:", multiply(3, 5));

