# TPC1: 
## 2024-03-08

## Autor:
- a100545
- Daniel da Silva Pereira

## Resumo
Neste trabalho, utilizou-se o JSON [data.json](data.json) fornecido pelo docente com informação sobre filmes, para produzir um website onde se pode consultar e navegar nesta estrutura.

O objetivo foi criar um serviço web que disponibiliza a informação sobre os filmes. Os filmes são servidos por um `json-server` ao servidor `node`.

## Resultados

Instalar as dependências:
```bash
$ npm install
```

Correr o `json-server`:
```bash
$ json-server --watch data.json
```

Correr o servidor `node`:
```bash
$ npm start
```

## Páginas

- `/`, lista das entidades disponíveis no dataset

- `/movies`, lista de todos os filmes
- `/movies/1`, detalhes de um filme

- `/actors`, lista de todos os atores
- `/actors/1`, detalhes de um ator

- `/genres`, lista de todos os géneros
- `/genres/1`, detalhes de um género
