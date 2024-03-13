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

        // GET /movies --------------------------------------------------------------------
        else if (req.url == "/movies") {
          axios.get('http://localhost:3000/movies')
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.moviesListPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na obtenção da lista de alunos: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Error obtaining the list of movies...")
              res.end()
            })
        }

        // GET /movies/:id --------------------------------------------------------------------
        else if (/\/movies\/\w+$/.test(req.url)) {
          var id = req.url.split("/")[2]
          axios.get('http://localhost:3000/movies/' + id)
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.moviePage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Error obtaining the movie: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Error obtaining the movie...")
              res.end()
            })
        }

        // GET /actors --------------------------------------------------------------------
        else if (req.url == "/actors") {
          axios.get('http://localhost:3000/actors')
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.actorsListPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na obtenção da lista de alunos: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Error obtaining the list of movies...")
              res.end()
            })
        }
        // GET /actors/:id --------------------------------------------------------------------
        else if (/\/actors\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(req.url)) {
          var id = req.url.split("/")[2]
          axios.get('http://localhost:3000/actors/' + id)
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.actorPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na obtenção do aluno: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Error obtaining the actor...")
              res.end()
            })
        }

        // GET /genres --------------------------------------------------------------------
        else if (req.url == "/genres") {
          axios.get('http://localhost:3000/genres')
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.genresListPage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Error obtaining the list of genres: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Error obtaining the list of movies...")
              res.end()
            })
        }
        // GET /genres/:id --------------------------------------------------------------------
        else if (/\/genres\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/?$/.test(req.url)) {
          var id = req.url.split("/")[2]
          axios.get('http://localhost:3000/genres/' + id)
            .then(response => {
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write(templates.genrePage(response.data, d))
              res.end()
            })
            .catch(function(error) {
              console.log('Erro na obtenção do aluno: ' + error);
              res.writeHead(520, { 'Content-Type': 'text/html; charset=utf-8' })
              res.write("<p>Error obtaining the genre...")
              res.end()
            })
        }

        // GET ? -> Lancar um erro
        else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
          res.write("<p>" + req.url + " not supported in this server.")
          res.end()
        }
        break

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


