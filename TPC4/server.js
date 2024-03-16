var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./template.js')          // Necessario criar e colocar na mesma pasta
var static = require('./static.js')             // Colocar na mesma pasta

// Aux functions
function collectRequestBodyData(request, callback) {
  if (request.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = '';
    request.on('data', chunk => {
      body += chunk.toString();
    });
    request.on('end', () => {
      callback(parse(body));
    });
  }
  else {
    callback(null);
  }
}

// Server creation

var alunosServer = http.createServer((req, res) => {
  // Logger: what was requested and when it was requested
  var d = new Date().toISOString().substring(0, 16)
  console.log(req.method + " " + req.url + " " + d)

  // Handling request
  if (static.staticResource(req)) {
    static.serveStaticResource(req, res)
  }
  else {
    switch (req.method) {
      case "GET":
        // GET / --------------------------------------------------------------------
        if (req.url == "/") {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          res.write(templates.indexPage(d))
          res.end()
        }

        // GET /compositores/create --------------------------------------------------------------------
        else if (/\/compositores\/create\/?$/.test(req.url)) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          res.write(templates.compositorCreatePage(d))
          res.end()
        }
        // GET /compositores --------------------------------------------------------------------
        else if (/\/compositores\/?$/.test(req.url)) {
          axios.get('http://localhost:3000/compositores')
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.compositoresListPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na obtenção da lista de alunos: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na obtenção da lista de compositores...")
              res.end()
            })
        }

        // GET /compositores/:id --------------------------------------------------------------------
        else if (/\/compositores\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[2]
          axios.get('http://localhost:3000/compositores/' + id)
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.compositorPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Error obtaining the movie: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na obtenção do compositor...")
              res.end()
            })
        }

        // GET /compositores/delete/:id --------------------------------------------------------------------
        else if (/\/compositores\/delete\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[3]
          axios.delete('http://localhost:3000/compositores/' + id)
            .then(response => {
              res.writeHead(302, { 'Location': '/compositores' })
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na remoção do compositor: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na remoção do compositor...")
              res.end()
            })
        }

        // GET /compositores/edit/:id --------------------------------------------------------------------
        else if (/\/compositores\/edit\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[3]
          axios.get('http://localhost:3000/compositores/' + id)
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.compositorEditPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Error obtaining the movie: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na edição do compositor...")
              res.end()
            })
        }


        // GET /periodos/create --------------------------------------------------------------------
        else if (/\/periodos\/create\/?$/.test(req.url)) {
          console.log("CREATE")
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
          res.write(templates.periodoCreatePage(d))
          res.end()
        }
        // GET /periodos --------------------------------------------------------------------
        else if (/\/periodos\/?$/.test(req.url)) {
          axios.get('http://localhost:3000/periodos')
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.periodosListPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na obtenção da lista de periodos: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na obtenção da lista de periodos...")
              res.end()
            })
        }


        // GET /periodos/:id --------------------------------------------------------------------
        else if (/\/periodos\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[2]
          axios.get('http://localhost:3000/periodos/' + id)
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.periodoPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na obtenção do periodo: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na obtenção do compositor...")
              res.end()
            })
        }
        // GET /periodos/delete/:id --------------------------------------------------------------------
        else if (/\/periodos\/delete\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[3]
          axios.delete('http://localhost:3000/periodos/' + id)
            .then(response => {
              res.writeHead(302, { 'Location': '/periodos' })
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na remoção do periodo: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na remoção do periodo...")
              res.end()
            })
        }
        // GET /compositores/edit/:id --------------------------------------------------------------------
        else if (/\/periodos\/edit\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[3]
          axios.get('http://localhost:3000/periodos/' + id)
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.periodoEditPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Error obtaining the movie: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Erro na edição do compositor...")
              res.end()
            })
        }

        break;

      case "POST":
        // POST /compositores/edit/:id --------------------------------------------------------------------
        if (/\/compositores\/edit\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[3]
          collectRequestBodyData(req, function(result) {
            const data = JSON.stringify(result)
            axios.patch('http://localhost:3000/compositores/' + id, data)
              .then(response => {
                res.writeHead(302, { 'Location': '/compositores' })
                res.end()
              })
              .catch(function(error) {
                console.log('Erro na inserção do compositor: ' + error);
                res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<p>Erro na edição do compositor...")
                res.end()
              })
          })
        }

        // POST /compositores/create--------------------------------------------------------------------
        if (/\/compositores\/create\/?$/.test(req.url)) {
          collectRequestBodyData(req, function(result) {
            console.log
            const data = JSON.stringify(result)
            axios.post('http://localhost:3000/compositores/', data)
              .then(response => {
                res.writeHead(302, { 'Location': '/compositores' })
                res.end()
              })
              .catch(function(error) {
                console.log('Erro na inserção do compositor: ' + error);
                res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<p>Erro na edição do compositor...")
                res.end()
              })
          })
        }

        else if (/\/periodos\/edit\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[3]
          collectRequestBodyData(req, function(result) {
            const data = JSON.stringify(result)
            axios.patch('http://localhost:3000/periodos/' + id, data)
              .then(response => {
                res.writeHead(302, { 'Location': '/periodos' })
                res.end()
              })
              .catch(function(error) {
                console.log('Erro na inserção do compositor: ' + error);
                res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<p>Erro na inserção do compositor...")
                res.end()
              })
          })
        }
        //
        // POST /periodos/create--------------------------------------------------------------------
        if (/\/periodos\/create\/?$/.test(req.url)) {
          collectRequestBodyData(req, function(result) {
            const data = JSON.stringify(result)
            axios.post('http://localhost:3000/periodos/', data)
              .then(response => {
                res.writeHead(302, { 'Location': '/periodos' })
                res.end()
              })
              .catch(function(error) {
                console.log('Erro na inserção do periodo: ' + error);
                res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
                res.write("<p>Erro na edição do periodo...")
                res.end()
              })
          })
        }

        break;

      default:
        // Outros metodos nao sao suportados
        res.writeHead(501, { 'Content-Type': 'text/html; charset=utf-8' })
        res.write("<p>" + req.method + " not supported in this server.")
        res.end()
    }
  }
})

alunosServer.listen(8000, () => {
  console.log("Server listening on port 8000...")
})


