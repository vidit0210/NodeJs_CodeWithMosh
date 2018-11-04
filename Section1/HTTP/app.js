const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url==='vidit'){
        res.write('Hi Vidit');
        res.end();
    }

    if(req.url==='API'){
          res.write('Gving out APIS');  
          res.end();
    }
});
server.listen(2000);

console.log('Listening to port 2000....')
