let express = require('express');
let router = express.Router(); //usamos 
const mongoose = require('mongoose');
let Person = require('../models/person'); // importamos nuestro esquema



router.get('/',async (req,res)=>{ //Definimos como index la tabla de persons
    let data = await Person.find({}); // Crear una consulta a mongo
    res.render('index', {data});
    
})
router.post('/find',async (req,res)=>{ //Definimos como index la tabla de persons
    let data = await Person.find({"Nombre":new RegExp(req.body.nombre,"i")}); // Crear una consulta 
    res.render('find', {data});
   
})

router.get('/student',  (req, res) => {
    res.render('student'); // creamos una nueva vista 
});

router.post('/addStudent', (req, res) => { //Cuando usamos el metodo Post 
    const persona = Person({
        "Nombre":req.body.nombre,
        "Edad":req.body.edad,
        "Nss":req.body.nss,
        "TpSangre":req.body.tpSangre
    });
    
    persona.save().then(()=>{res.redirect('/');});
    })
router.get('/findById/:id', (req, res)=>{ // buscar por ID  
    Person.findById(req.params.id)
    .then((myPerson)=>{res.render('personUpdate',{myPerson})})
    .catch((err)=>{res.json({message:err});})
})
router.post('/updatePerson', (req, res)=>{ 
    Person.findByIdAndUpdate(req.body.objId, //Buscar por Id 
        {
            Nombre:req.body.nombre,
            Edad:req.body.edad,
            TpSangre:req.body.tpSangre,
            Nss:req.body.nss
        })
        .then((data)=>{res.redirect('/')}) //Al terminar de actualizar 
        .catch((err)=>{
            res.json({message: err}) 
        });
})
router.get('/deletePerson/:id', (req, res)=>{ 
    Person.findByIdAndDelete(req.params.id)
    .then(()=>{res.redirect('/')})
    .catch((err)=>{res.json({message:err});})
})
module.exports = router; //exportamos el router