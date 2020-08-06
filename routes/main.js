var express = require('express');
var router = express.Router();
let passport = require('passport')
let auth = require('../controllers/Authentication');
let sessionHelper = require('../models/session');
let user = require('../models/usuario');
const { check, validationResult } = require('express-validator');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', auth.isLogged, passport.authenticate('local'), function(req, res){
    res.json({mensaje: "Logged in con éxito.", status: 200})
});

router.get('/logout', auth.isAuth, function(req, res){
    req.logout();
    res.json({mensaje: "Logged out con éxito.", status: 200})
})

router.post('/registro', 
    check('email').custom(value => { return user.checkingEmail(value).then(user =>{if(user){ return Promise.reject('Correo en existencia.'); } } )}),
    check('username').custom(value => { return user.getUserByUsername(value).then(user =>{if(user){ return Promise.reject('Nombre de usuario en existencia. Intente con uno diferente.'); } } )}),
    auth.isLogged, function(req, res){

    const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()  })
      }

    user.registrarUsuario(req.body).then((result)=>{
        let count = result.rowCount;
        let status, mensaje;
        if(count > 0){
            status = 200;
            mensaje = "Usuario Registrado :).";
        }else{
          status = 500;
          mensaje = 'Error al registrar Usuario :(.'
          }
      res.json({status, mensaje})
      }).catch(err => {
        console.log(err);
        res.status(500).json({status: 500, mensaje: 'Error al Registrar :(.'});
        }) 
});


router.get('/establecimientos', auth.isAuth, (req, res) => {
    user.establecimientosMostrar().then((data) => {
        let message, status;
        if(data !== null){
            message = "establecimientos desplegados :).";
            status = 200;
        }else{
            message = "establecimientos NO desplegados :(.",
            status = 404;
        }
        res.json({data, message, status});
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'Error al cargar los establecimientos.'})  
    })
})

router.get('/establecimientos-usuario', auth.isAuth, (req, res) => {
    user.establecimientosMostrarIndividual(sessionHelper.getIdFromSession(req)).then((data) => {
        let message, status;
        if(data !== null){
            message = "establecimientos desplegados :).";
            status = 200;
        }else{
            message = "establecimientos NO desplegados :(.",
            status = 404;
        }
        res.json({data, message, status});
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'Error al cargar los establecimientos.'})  
    })
})

router.post('/establecimiento/crear', auth.isAuth, (req, res) => {
    user.establecimientoCrear(req.body, sessionHelper.getIdFromSession(req)).then((result) => {
        res.json({status: 200, message: 'establecimiento creado :).'})
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'Error al crear establecimiento :(.'})
    })
})

router.delete('/establecimiento/:id/borrar', auth.isAuth, (req, res) => {
    user.establecimientoBorrar(req.params.id, sessionHelper.getIdFromSession(req)).then((result) => {
        res.json({status: 200, message: 'establecimiento borrado :).'})
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error al borrar establecimiento :(.'})
    })
})

router.get('/establecimiento/:id', auth.isAuth, (req, res) => {
    user.establecimientoMostrar(req.params.id).then((data) => {
        let message, status;
        if(data !== null){
            message = "establecimiento desplegado :).";
            status = 200;
        }else{
            message = "establecimiento inexistente :(.",
            status = 404;
        }
        res.json({data, message, status});
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error desplegando establecimiento :(.'})  
    })
})














router.put('/nota/:id/editar', auth.isAuth, (req, res) => {
    user.notaEditar(req.body, req.params.id, sessionHelper.getIdFromSession(req)).then((result) => {
        res.json({status: 200, message: 'Nota modificada :).'})
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'Error al modificar nota :(.'})
    })
})




module.exports = router;
