//import library 
const http = require ('http');
const fs = require ('fs');
const { setServers } = require('dns');

//Membaca File

//konfigurasi Server
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
})

//running server
setServers.listen(8080, () => {
    console.log("port 8080 || Server is running...")
});