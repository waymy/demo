//main.js 
import css from './main.css';
console.log(JSON.stringify(css))
var moment = require('moment');
console.log(moment().format());
var greeter = require('./Greeter.js');
document.body.appendChild(greeter());