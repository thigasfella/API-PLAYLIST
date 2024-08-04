const playlists = [
    {
        id: 1,
        nome: 'Chill Vibes',
        tags: ['Relax', 'Acoustic'],
        ano: 2023,
        artista: 'John Mayer',
        album: 'Continuum',
        musicas: [
            'Gravity',
            'Vultures'
        ]
    },
    {
        id: 2,
        nome: 'Workout Pump',
        tags: ['Energetic', 'Hip Hop'],
        ano: 2022,
        artista: 'Drake',
        album: 'Certified Lover Boy',
        musicas: [
            'Wants and Needs',
            'Fair Trade',
            'Way 2 Sexy'
        ]
    },
    {
        id: 3,
        nome: 'Summer Hits',
        tags: ['Pop', 'Upbeat'],
        ano: 2024,
        artista: 'Dua Lipa',
        album: 'Future Nostalgia',
        musicas: [
           'Don\'t Start Now',
            'Physical'
        ]
    },
    {
        id: 4,
        nome: 'Classical Gems',
        tags: ['Classical', 'Instrumental'],
        ano: 2021,
        artista: 'Ludovico Einaudi',
        album: 'Seven Days Walking',
        musicas: [
            'Walk',
            'Drop',
            'Ascolta'
        ]
    },
    {
        id: 5,
        nome: 'Road Trip Classics',
        tags: ['Rock', 'Oldies'],
        ano: 2020,
        artista: 'Queen',
        album: 'Greatest Hits',
        musicas: [
            'Bohemian Rhapsody',
            'Don\'t Stop Me Now'
        ]
    }
];


const playlistsController = {

    // GET /playlists
    index: (req, res) =>{
        res.json(playlists)
    },

    // GET /playlists/:id
    show: (req, res) => {
        const {id} = req.params

        const playlist = playlists.find(playlist => playlist.id === Number(id))

        if(!playlist){
           return res.status(404).json({message: "Playlist not found!"})
        }
        res.status(200)
        res.json(playlist)
    },

    // POST /playlists
    save: (req, res) => {
        const {nome, tags, ano, artista, album, musicas} = req.body


        //validação
        if(!nome || !Array.isArray(tags) || isNaN(Number(ano)) || !artista || !album || !Array.isArray(musicas)){
           return res.status(400).json({message: "Invalid data!"})
        }

        const newPlaylist = {
            id: Math.floor(Math.random() * 99999),
            nome,
            tags,
            ano,
            artista,
            album,
            musicas
        }
        playlists.push(newPlaylist)
        res.status(201).json(newPlaylist)
    },

    // PUT /playlists/:id
    update: (req, res) =>{
        const { id } = req.params
        const {nome} = req.body

        const playlistIndex = playlists.findIndex(playlist => playlist.id === Number(id))

        if(playlistIndex === -1){
            return res.status(404).json({message: "Playlist not found!"})
        }

        if(typeof nome === 'string'){
            playlists[playlistIndex].nome = nome
        }

        res.status(200).json(playlists[playlistIndex])

    },
    // DELETE /playlists/:id
    delete: (req, res) => {
        const { id } = req.params

        const playlist = playlists.findIndex(playlist => playlist.id === Number(id))


        if(playlist === -1){
            return res.status(404).json({message: "Playlist not found!"})
        }
        playlists.splice(playlist, 1)
        res.status(204).end()
    },

    // POST /playlists/:id/musicas
    addMusic: (req, res) => {
        const { id } = req.params
        const {musicas} = req.body
        const playlist = playlists.findIndex(playlist => playlist.id === Number(id))

        if(playlist === -1){
            return res.status(404).json({message: "Playlist not found!"})
        }
        if (!Array.isArray(musicas)) {
            return res.status(400).json({ message: "Musicas must be an array!" });
        }

        playlists[playlist].musicas.push(...musicas)
        res.status(201).json(playlists[playlist])
    },
    
    // DELETE /playlists/:id/tags/:nome
    removeTag: (req, res) => {
        const {id, nome} = req.params

        const playlist = playlists.findIndex(playlist => playlist.id === Number(id))

        if(playlist === -1){
            return res.status(404).json({message: "Playlist not found!"})
        }

        if(typeof nome !== 'string' || !playlists[playlist].tags.includes(nome)){
            return res.status(400).json({message: 'Invalid genre!'})
        }

        playlists[playlist].tags = playlists[playlist].tags.filter(tag => tag !== nome)

        res.status(200).json(playlists[playlist])

    },
    // POST /playlists/:id/tags
    addTag: (req, res) => {
        const { id } = req.params
        const { nome } = req.body
    
        const playlist = playlists.findIndex(playlist => playlist.id === Number(id))
    
        if (playlist === -1) {
            return res.status(404).json({ message: 'Playlist not found!' })
        }
    
        if (typeof nome !== 'string' || playlists[playlist].tags.includes(nome)) {
            return res.status(400).json({ message: 'Invalid genre!' })
        }
    
        playlists[playlist].tags.push(nome)
        res.status(201).json(playlists[playlist])
    }
}

module.exports = playlistsController