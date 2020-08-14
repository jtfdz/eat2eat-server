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
    res.json({mensaje: "logged in con éxito.", status: 200})
});

router.get('/logout', auth.isAuth, function(req, res){
    req.logout();
    res.json({mensaje: "logged out con éxito.", status: 200})
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
            mensaje = "usuario registrado :).";
        }else{
          status = 500;
          mensaje = 'error al registrar Usuario :(.'
          }
      res.json({status, mensaje})
      }).catch(err => {
        console.log(err);
        res.status(500).json({status: 500, mensaje: 'error al Registrar :(.'});
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
        res.json({status: 500, message: 'error al cargar los establecimientos :(.'})  
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

router.put('/establecimiento/:id/editar', auth.isAuth, (req, res) => {
    user.establecimientoEditar(req.body, req.params.id, sessionHelper.getIdFromSession(req)).then((result) => {
        res.json({status: 200, message: 'establecimiento modificado :).'})
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error al modificar establecimiento :(.'})
    })
})

router.get('/productos/:id', auth.isAuth, (req, res) => {
    user.productosMostrar(req.params.id).then((data) => {
        let message, status;
        if(data !== null){
            message = "productos desplegados :).";
            status = 200;
        }else{
            message = "productos NO desplegados :(.",
            status = 404;
        }
        res.json({data, message, status});
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error al cargar los productos :(.'})  
    })
})

router.get('/producto/:id', auth.isAuth, (req, res) => {
    user.productoMostrar(req.params.id).then((data) => {
        let message, status;
        if(data !== null){
            message = "producto desplegados :).";
            status = 200;
        }else{
            message = "producto NO desplegados :(.",
            status = 404;
        }
        res.json({data, message, status});
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error al cargar el producto :(.'})  
    })
})

router.post('/producto-crear/:id', auth.isAuth, (req, res) => {
    user.productoCrear(req.body,req.params.id).then((result) => {
        res.json({status: 200, message: 'producto creado :).'})
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error al creado el producto :(.'})  
    })
})

router.delete('/producto/:id/borrar', auth.isAuth, (req, res) => {
    user.productoBorrar(req.params.id, sessionHelper.getIdFromSession(req)).then((result) => {
        res.json({status: 200, message: 'producto borrado :).'})
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error al borrar producto :(.'})
    })
})

router.put('/producto/:id/editar', auth.isAuth, (req, res) => {
    user.productoEditar(req.body, req.params.id, sessionHelper.getIdFromSession(req)).then((result) => {
        res.json({status: 200, message: 'producto modificado :).'})
    }).catch(err => {
        console.log(err)
        res.json({status: 500, message: 'error al modificar producto :(.'})
    })
})


module.exports = router;
