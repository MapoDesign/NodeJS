const express = require('express')
const app = express()
const {pokedex} = require('./pokedex')
const {users} = require('./users')

app.use(express.static('public'))

const middlewareTest = require('./middleware')

app.use('/pokemon',middlewareTest) // mette il middleware solo alla categoria pokemon

app.get('/middleware', (req,res)=>{
    res.send('Home')
})

app.get('/', (req, res) => {
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

app.get('/users',(req,res)=>{
    res.sendFile('users.html', {root: __dirname + '/public'})
})

app.get('/pokemon',(req,res)=>{
    const listaPokemon = pokedex.map((pokemon)=>{
        const {id,name,image,type} = pokemon
        return {id,name,image,type}
    })
    res.json(listaPokemon)
})

app.get('/pokemon/:id', (req,res)=>{
    console.log(req.params);
    const {id} = req.params
    // const pokemonScelto = pokedex.find((pokemon)=> pokemon.id === id) // Se id è stinga
    const pokemonScelto = pokedex.find((pokemon)=> pokemon.id === Number(id)) // Se id è numero

    if (!pokemonScelto) {
        return res.status(404).json({messaggio:"Pokemon non trovato",code:404})
    }

    res.json(pokemonScelto)
})

app.get('/pokemon/search',(req,res)=>{
    console.log(req.query);
    const {query,limit} = req.query;
    let pokemonFiltrati = [...pokedex]

    // Per ricercare dal nome
    if (query) {
        pokemonFiltrati = pokemonFiltrati.filter((pokemon)=>{
            return pokemon.name.english.startsWith(query)
        })
    }

    // Per gestire il limite della ricerca
    if (limit) {
        pokemonFiltrati = pokemonFiltrati.slice(0,Number(limit))
    }

    if (pokemonFiltrati.length < 1) {
        return res.status(200).json({success: true, data:[]})
    }

    res.status(200).json(pokemonFiltrati)
})

// Per chiamate REST - API
app.use(express.json())

app.get('/api/users', (req,res) => {
    res.status(200).json({data:users});
})

app.get('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const userSelected = users.find(user => user.id === Number(id))
    res.json(userSelected)
})

app.post('/api/users', (req,res) => {
    console.log(req.body);
    const userAdded = req.body;
    users.push(userAdded);  // copia solo nell'array ma non nel file users.js perché sono dati non persistenti
    res.status(200).json({success:true,data:users})
})

app.put('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const userSelected = req.body;
    users[Number(id)-1] = userSelected;
    res.status(200).json({success:true,data:users})
})

app.delete('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const index = users.findIndex(user => user.id === Number(id))
    users.splice(index,1);
    res.status(200).json({success:true,data:users})
})

app.all('*',(req,res)=>{
    res.sendFile('404.html', {root: __dirname + '/public'})
})

app.listen(3000)