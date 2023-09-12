const http = require('http');

const server = http.createServer((req,res) => {
    if(req.url === "/"){
        res.end('Benvenuto sul sito');
    } else if (req.url === "/elisa") {
        res.end('Il profilo di Elisa');
    } else {
        res.end('<h1>Errore</h1><p>Torna alla <a href="/">Home</a>, la pagina non esiste</p>')
    }
    
})

server.listen(3000);