const db = require('./db');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
let sessionHelper = require('../models/session');
const config = require('./config');





module.exports.registrarUsuario = async (data) => {
    try{
        const result = await db.result(config.q1, [data.username, bcrypt.hashSync(data.passwords.password, 10), data.nombre, data.email, 2] );
        return result
    }catch(err){
        throw err
    }
}

module.exports.getUserByUsername = async (username) => {
    try{
        const data = await db.oneOrNone(config.q2, [username]);
        return data;
    }catch(err){
        throw err
    }
}

module.exports.checkingEmail = async (correo) => {
    try{
        const data = await db.oneOrNone(config.q3, [correo]);
        return data;
    }catch(err){
        throw err
    }
}

module.exports.getUserById = async (id) => {
    try{
        const data = db.oneOrNone(config.q4, [id]);
        return data;
    }catch(err){
        throw err
    }
}


module.exports.comparePassword = async (candidatePassword, hash) => {
    return bcrypt.compare(candidatePassword, hash);
}

module.exports.establecimientosMostrar = async () => {
    try{
        const result = await db.any(config.q5)
        return result;
    }catch(err){
        throw err
    }
}

module.exports.establecimientosMostrarIndividual = async (id) => {
    try{
        const result = await db.any(config.q6, [id])
        return result;
    }catch(err){
        throw err
    }
}


module.exports.establecimientoCrear = async (data,id) => {
    try{
        const result = await db.none(config.q7 , [id, data.nombre,data.direccion,data.descripcion,data.contacto,data.coloreo])
        return result
    }catch(e){
        throw e;
    }
}

module.exports.establecimientoBorrar = async (data, id) => {
    try{
        const result = await db.none(config.q8, [data, id])
        return result
    }catch(e){
        throw e;
    }
}

module.exports.establecimientoMostrar = async (id) => {
    try{
        const data = await db.any(config.q9, [id])
        return data;
    }catch(err){
        throw err
    }
}



















module.exports.notaEditar = async (data, idn, idu) => {
    try {
        const result = await db.none(config.q12, [data.titulo,data.contenido,idn, idu]);
        return result
    }catch(e){
        throw e;
    }
}




