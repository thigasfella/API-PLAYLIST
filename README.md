# Playlist API

## Descrição

Esta API permite gerenciar playlists, incluindo operações para criar, visualizar, atualizar e excluir playlists, além de adicionar e remover músicas e tags.

## Estrutura dos Dados

Cada playlist é representada pelos seguintes campos:

- **id**: Identificador único da playlist.
- **nome**: Nome da playlist.
- **tags**: Lista de tags associadas à playlist.
- **ano**: Ano de lançamento.
- **artista**: Nome do artista.
- **album**: Nome do álbum.
- **musicas**: Lista de músicas na playlist.

## Endpoints

### Listar Todas as Playlists

- **Método:** GET
- **URL:** `/playlists`

Este endpoint retorna uma lista de todas as playlists disponíveis.

### Obter Playlist por ID

- **Método:** GET
- **URL:** `/playlists/:id`

Obtém detalhes de uma playlist específica com base no ID fornecido.

### Criar Nova Playlist

- **Método:** POST
- **URL:** `/playlists`

Cria uma nova playlist com as informações fornecidas no corpo da requisição. É necessário incluir o nome, tags, ano, artista, álbum e uma lista de músicas.

### Atualizar Playlist

- **Método:** PUT
- **URL:** `/playlists/:id`

Atualiza o nome de uma playlist existente com base no ID fornecido. O corpo da requisição deve incluir o novo nome.

### Excluir Playlist

- **Método:** DELETE
- **URL:** `/playlists/:id`

Remove uma playlist existente com base no ID fornecido.

### Adicionar Músicas à Playlist

- **Método:** POST
- **URL:** `/playlists/:id/musicas`

Adiciona novas músicas a uma playlist existente. O corpo da requisição deve incluir uma lista de músicas a serem adicionadas.

### Remover Tag da Playlist

- **Método:** DELETE
- **URL:** `/playlists/:id/tags/:nome`

Remove uma tag específica de uma playlist com base no ID e no nome da tag fornecidos.

### Adicionar Tag à Playlist

- **Método:** POST
- **URL:** `/playlists/:id/tags`

Adiciona uma nova tag a uma playlist existente. O corpo da requisição deve incluir o nome da tag.

## Mensagens de Erro

- **404 Not Found:** Playlist não encontrada.
- **400 Bad Request:** Dados inválidos ou tag inválida.

## Configuração do Servidor

Certifique-se de que o middleware `express.json()` está configurado para processar JSON no corpo das requisições. Aqui está um exemplo de configuração básica:

```javascript
const express = require('express');
const app = express();

// Middleware para processar JSON
app.use(express.json());

// Suas rotas e configurações aqui

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
