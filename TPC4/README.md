# TPC4: Compositores de Música 

## 2024-03-15

## Autor:
- a100545
- Daniel da Silva Pereira

## Resumo

Criar uma aplicação para a gestão de uma base de dados de compositores musicais:
1. Montar a API de dados com o json-server a partir do dataset [data.json](./data.json);
2. Criar uma aplicação Web com as seguintes caraterísticas:
    - CRUD sobre compositores;
    - CRUD sobre periodos musicais.
3.Investigar e inserir pelo menos 5 compositores do período moderno ou serialista.

## Páginas

- GET `/`

- GET `/compositores` 
- GET `/compositores/:id`
- GET `/compositores/edit/:id`
- GET `/compositores/create`
- POST `/compositores/edit/:id`
- POST `/compositores/delete/:id`
- POST `/compositores/create`

- GET `/periodos` 
- GET `/periodos/:id`
- GET `/periodos/edit/:id`
- GET `/periodos/create`
- POST `/periodos/edit/:id`
- POST `/periodos/delete/:id`
- POST `/periodos/create`
