const express = require('express')
const playlistsController = require('./controllers/playlistsController')

const routes = express.Router()

routes.get('/', (req, res) =>{
    res.render('index.html')
})
routes.get('/playlists', playlistsController.index)
routes.get('/playlists/:id', playlistsController.show)

routes.post('/playlists', playlistsController.save)
routes.post('/playlists/:id/musicas', playlistsController.addMusic)
routes.post('/playlists/:id/tags', playlistsController.addTag)

routes.put('/playlists/:id', playlistsController.update)

routes.delete('/playlists/:id', playlistsController.delete)
routes.delete('/playlists/:id/tags/:nome', playlistsController.removeTag)

module.exports = routes