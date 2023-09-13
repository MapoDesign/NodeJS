const express = require('express')
const app = express()
const {pokedex} = require('./pokedex')

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname + '/public'})

})

app.get('/about',(req,res)=>{
    res.sendFile('about.html', {root: __dirname + '/public'})
})

app.get('/contact',(req,res)=>{
    res.sendFile('contact.html', {root: __dirname + '/public'})
})

app.get('/service',(req,res)=>{
    res.sendFile('service.html', {root: __dirname + '/public'})
})

app.get('/pokemon',(req,res)=>{
    const listaPokemon = pokedex.map((pokemon)=>{
        return pokemon
    })
    res.json(listaPokemon)
})

app.get('/pokemon/1', (req,res)=>{
    console.log(req.params);
    const pokemon = pokedex.find((pokemon)=> {pokemon.id === '1'})
    res.json(pokemon)
})

app.all('*',(req,res)=>{
    res.sendFile('404.html', {root: __dirname + '/public'})
})

app.listen(3000)