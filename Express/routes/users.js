// Modulo di routing per chiamate REST - API
const express = require('express');
const router = express.Router();

const {users} = require('../users');

router.get('/', (req,res) => {
    res.status(200).json({data:users});
})

router.get('/:id', (req,res) => {
    const {id} = req.params;
    const userSelected = users.find(user => user.id === Number(id))
    res.json(userSelected)
})

router.post('/', (req,res) => {
    console.log(req.body);
    const userAdded = req.body;
    users.push(userAdded);  // copia solo nell'array ma non nel file users.js perché sono dati non persistenti
    res.status(200).json({success:true,data:users})
})

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const userSelected = req.body;
    users[Number(id)-1] = userSelected;
    res.status(200).json({success:true,data:users})
})

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    const index = users.findIndex(user => user.id === Number(id))
    users.splice(index,1);
    res.status(200).json({success:true,data:users})
})

module.exports = router;