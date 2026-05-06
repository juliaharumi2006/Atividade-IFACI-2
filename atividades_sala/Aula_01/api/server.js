const express = require('express')
const cors = require('cors')
const api = express()

//Middlewares
api.use(express.json())
api.use(cors())

const dadosUsuarios = []
const dadosDispositivos = []

let idUsuarios = 0;
let idDispositivos = 0;

//Rotas
api.get('/usuarios', (req, res)=>{
    let users = dadosUsuarios;

    res.status(200).send(users)
})


api.post('/novoUsuario',(req, res)=>{
    if(dadosUsuarios.length <= 0){
        idUsuarios = 0;
    }
    idUsuarios = idUsuarios + 1; //incremento
    
    let user = {
        id: idUsuarios,
        nome_completo: req.body.nome_completo,
        email: req.body.email,
        senha: req.body.senha
    }
    dadosUsuarios.push(user)
    res.status(201).send({
        code: 201,
        msg: "Usuário Criado com sucesso!"})
})
api.delete('/usuarios/:id', (req, res)=>{
    let id = req.params.id
    let index = dadosUsuarios.findIndex(p => p.id === parseInt(id))

    if(index !== -1){
        dadosUsuarios.splice(index, 1);
        
        return res.status(200).send({
            code: 200,
            msg: "Usuário deletado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Usuário não encontrado"
        })
    }

})
api.put('/usuarios/:id', (req, res)=>{
    let id = req.params.id
    let newBody = req.body
    let index = dadosUsuarios.findIndex(p => p.id === parseInt(id))

    if(index !== -1){
        dadosUsuarios[index] = {id: parseInt(id), ...newBody}
        return res.status(200).send({
            code: 200,
            msg: "Usuário editado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Usuário não encontrado"
        })
    }
})


//Rotas dispositivo
api.get('/dispositivo', (req, res)=>{
    let users = dadosDispositivos;

    res.status(200).send(users)
})


api.post('/novoDispositivo',(req, res)=>{
    if(dadosDispositivos.length <= 0){
        idDispositivos = 0;
    }
    idDispositivos = idDispositivos + 1; //incremento
    
    let user = {
        id: idDispositivos,
        nome_completo: req.body.nome_completo,
        email: req.body.email,
        senha: req.body.senha
    }
    dadosDispositivos.push(user)
    res.status(201).send({
        code: 201,
        msg: "Dispositivo Criado com sucesso!"})
})

api.delete('/dispositivos/:id', (req, res)=>{
    let id = req.params.id
    let index = dadosDispositivos.findIndex(p => p.id === parseInt(id))

    if(index !== -1){
        dadosDispositivos.splice(index, 1);
        
        return res.status(200).send({
            code: 200,
            msg: "Dispositivo deletado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Dispositivo não encontrado"
        })
    }

})

api.put('/dispositivos/:id', (req, res)=>{
    let id = req.params.id
    let newBody = req.body
    let index = dadosDispositivos.findIndex(p => p.id === parseInt(id))

    if(index !== -1){
        dadosDispositivos[index] = {id: parseInt(id), ...newBody}
        return res.status(200).send({
            code: 200,
            msg: "Dispositivo editado com sucesso!"
        })
    }
    else{
        return res.status(404).send({
            code: 404,
            msg: "Dispositivo não encontrado"
        })
    }
})



const porta = 8080;
api.listen(porta, ()=>{
    console.log(`API rodando na porta ${porta}`)
})