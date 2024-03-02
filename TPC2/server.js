const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 4000;
const HTML_FOLDER = 'html/';

http.createServer(function (req, res) {
    console.log("server running...");

    const q = url.parse(req.url, true);
    const pathname = q.pathname;

    if (isValidPath(pathname)) {
        servePage(pathname, res);
    } else {
        serveNotFound(res);
    }
}).listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

function isValidPath(pathname) {
    const regex = /^\/(c\d\d?)?$/;
    return regex.test(pathname);
}

function servePage(pathname, res) {
    const filePath = (pathname === "/") ? HTML_FOLDER + 'index.html' : HTML_FOLDER + 'show/' + pathname.substring(1) + ".html";
    
    fs.readFile(filePath, function(err, data) {
        if (err) {
            console.error(`Error reading file: ${err}`);
            serveError(res);
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
}

function serveNotFound(res) {
    const filePath = HTML_FOLDER + '404.html';
    
    fs.readFile(filePath, function(err, data) {
        if (err) {
            console.error(`Error reading file: ${err}`);
            serveError(res);
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
}

function serveError(res) {
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.write('<h1>Internal Server Error</h1>');
    res.end();
}
