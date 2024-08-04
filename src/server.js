const express = require('express')
const routes = require('./routes')
const path = require('node:path')
const app = express()

app.use(express.json())

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'));
app.use('/styles', express.static(path.join(__dirname, 'views', 'styles')));

app.use(routes)

const APP =  process.env.PORT || 3000
app.listen(APP, () =>{

})