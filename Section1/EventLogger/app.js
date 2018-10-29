const Logger = require('./logger.js');
const logger = new Logger();
logger.on("Sending message",(args)=>{console.log("Got The meesage with",args)});
logger.log();
