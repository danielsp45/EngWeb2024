// ---------------Index Section--------------------------------
exports.indexPage = function(d) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Index</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>Index</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><a href="/compositores">Compositores</a></li>
                    <li><a href="/periodos">Periodos</a></li>
                </ul>
            </div>
            <footer class="w3-container w3-green">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
  return pagHTML
}


// ---------------Compositores Section--------------------------------
exports.compositoresListPage = function(clist, d) {
  var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Compositores</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-green">
                    <h1>Lista de compositores</h1>
                    <a class="w3-button w3-white" href="/compositores/create">Adicionar Compositor</a>
                </header>
        
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Id</th><th>Name</th><th>Periodo</th>
                            <th>Actions</th>
                        </tr>
                `
  for (let i = 0; i < clist.length; i++) {
    pagHTML += `
                <tr>
                    <td>${clist[i].id}</td>
                    <td>
                        <a href="/compositores/${clist[i].id}">
                            ${clist[i].nome}
                        </a>
                    </td>
                    <td>${clist[i].periodo}</td>
                    <td>
                        [<a href="/compositores/edit/${clist[i].id}">Edit</a>][<a href="/compositores/delete/${clist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
  }

  pagHTML += `
            </table>
            </div>
                <footer class="w3-container w3-green">
                  <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/">Voltar</a>]</address>
                </footer>
            </div>
        </body>
    </html>
    `
  return pagHTML
}

exports.compositorPage = function(compositor, d) {
  var pagHTML = `
    <html>
    <head>
        <title>${compositor.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>${compositor.nome}</h1>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>ID: </b> ${compositor.id}</li>
                    <li><b>Data nascimento: </b> ${compositor.dataNasc}</li>
                    <li><b>Data obito: </b> ${compositor.dataObito}</li>
                    <li><b>Periodo: </b> ${compositor.periodo}</li>
                    <li><b>Bio: </b> ${compositor.bio}</li>
                </ul>
            </div >
    <footer class="w3-container w3-green">
      <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/compositores">Voltar</a>]</address>
    </footer>
        </div >
    </body >
    </html >
    `
  return pagHTML
}

exports.compositorEditPage = function(compositor, d) {
  var pagHTML = `
    <html>
    <head>
        <title>${compositor.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>${compositor.nome}</h1>
            </header>

            <div class="w3-container">
              <form action="/compositores/edit/${compositor.id}" method="POST">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> ${compositor.nome}</li>
                    <li><b>Data nascimento: </b> <input type="text" name="dataNasc" value="${compositor.dataNasc}"></li>
                    <li><b>Data obito: </b> <input type="text" name="dataObito" value="${compositor.dataObito}"></li>
                    <li><b>Periodo: </b> <input type="text" name="periodo" value="${compositor.periodo}"></li>
                    <li><b>Bio: </b> <input type="text" name="bio" value="${compositor.bio}"></li>
                </ul>
                <input type="submit" value="Submit">
            </div >
    <footer class="w3-container w3-green">
      <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/compositores">Voltar</a>]</address>
    </footer>
        </div >
    </body >
    </html >
    `
  return pagHTML
}

exports.compositorCreatePage = function(d) {
  var pagHTML = `
    <html>
    <head>
        <title>Criar compositor</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>Criar</h1>
            </header>

            <div class="w3-container">
              <form action="/compositores/create/" method="POST">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> <input type="text" name="nome""></li>
                    <li><b>Data nascimento: </b> <input type="text" name="dataNasc""></li>
                    <li><b>Data obito: </b> <input type="text" name="dataObito""></li>
                    <li><b>Periodo: </b> <input type="text" name="periodo"></li>
                    <li><b>Bio: </b> <input type="text" name="bio"></li>
                </ul>
                <input type="submit" value="Submit">
            </div >
    <footer class="w3-container w3-green">
      <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/compositores">Voltar</a>]</address>
    </footer>
        </div >
    </body >
    </html >
    `
  return pagHTML
}
// ---------------Periodos Section--------------------------------
exports.periodosListPage = function(plist, d) {
  var pagHTML = `
    <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" href="favicon.png" />
          <link rel="stylesheet" href="w3.css" />
          <title>Períodos</title>
        </head>
        <body>
          <div class="w3-card-4">

            <header class="w3-container w3-green">
              <h1>Períodos List</h1>
              <a class="w3-button w3-white" href="/periodos/create">Adicionar Periodo</a>
            </header>

            <div class="w3-container">
              <table class="w3-table-all">
                <tr>
                  <th>Id</th><th>Name</th>
                  <th>Actions</th>
                </tr>
                `
  for (let i = 0; i < plist.length; i++) {
    pagHTML += `
                <tr>
                    <td>${plist[i].id}</td>
                    <td>
                        <a href="/periodos/${plist[i].id}">
                            ${plist[i].nome}
                        </a>
                    </td>
                    <td>
                        [<a href="/periodos/edit/${plist[i].id}">Edit</a>][<a href="/periodos/delete/${plist[i].id}">Delete</a>]
                    </td>
                </tr>
        `
  }
  pagHTML += `
              </table>
            </div>
            <footer class="w3-container w3-green">
              <h5>Generated by RPCW2023 in ${d}</h5>
            </footer>
          </div>
        </body>
      </html>
  `
  return pagHTML
}

exports.periodoPage = function(periodo, d) {
  var pagHTML = `
    < html >
    <head>
        <title>Periodo: ${periodo.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>${periodo.nome}</h1>
            </header>
            <footer class="w3-container w3-green">
                <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/periodos">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html >
    `
  return pagHTML
}

exports.periodoEditPage = function(periodo, d) {
  var pagHTML = `
    <html>
    <head>
        <title>${periodo.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>${periodo.nome}</h1>
            </header>

            <div class="w3-container">
              <form action="/periodos/edit/${periodo.id}" method="POST">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> <input type="text" name="nome" value="${periodo.nome}"></li>
                </ul>
                <input type="submit" value="Submit">
            </div >
    <footer class="w3-container w3-green">
      <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/periodos">Voltar</a>]</address>
    </footer>
        </div >
    </body >
    </html >
    `
  return pagHTML
}

exports.periodoCreatePage = function(d) {
  var pagHTML = `
    <html>
    <head>
        <title>Criar periodo</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-green">
                <h1>Criar</h1>
            </header>

            <div class="w3-container">
              <form action="/periodos/create/" method="POST">
                <ul class="w3-ul w3-card-4" style="width:50%">
                    <li><b>Nome: </b> <input type="text" name="nome""></li>
                </ul>
                <input type="submit" value="Submit">
            </div >
    <footer class="w3-container w3-green">
      <address>Gerado por galuno::RPCW2022 em ${d} - [<a href="/periodos">Voltar</a>]</address>
    </footer>
        </div >
    </body >
    </html >
    `
  return pagHTML
}

// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d) {
  return `
    < p > ${d}: Error: ${errorMessage}</p >
      `
}
