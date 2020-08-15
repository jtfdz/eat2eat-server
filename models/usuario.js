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
        const result = await db.none(config.q7 , [id, data.nombre,data.direccion,data.descripcion,data.contacto,data.coloreo, data.latitud, data.longitud])
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

module.exports.establecimientoEditar = async (data, idn, idu) => {
    try {
        const result = await db.none(config.q10, [data.nombre,data.direccion,data.descripcion,data.contacto, idn, idu]);
        return result
    }catch(e){
        throw e;
    }
}


module.exports.productosMostrar = async (id) => {
    try{
        const result = await db.any(config.q11, [id])
        return result;
    }catch(err){
        throw err
    }
}


module.exports.productoCrear = async (data,id) => {
    try{
        const result = await db.none(config.q12 , [id, data.nombre, data.tiempo, data.descripcion, data.precio])
        return result
    }catch(e){
        throw e;
    }
}

module.exports.productoMostrar = async (id) => {
    try{
        const result = await db.any(config.q13, [id])
        return result;
    }catch(err){
        throw err
    }
}


module.exports.productoEditar = async (data, id, sessionid) => {
    try {
        const result = await db.none(config.q14, [data.nombre, data.tiempo, data.descripcion, data.precio, sessionid, id]);
        return result
    }catch(e){
        throw e;
    }
}

module.exports.productoBorrar = async (id, sessionid) => {
    try{
        const result = await db.none(config.q15, [id, sessionid])
        return result
    }catch(e){
        throw e;
    }
}

module.exports.carritoCrear = async (correo) => {
    try{
        const result = await db.none(config.q16, [correo])
        return result
    }catch(e){
        throw e;
    }
}


module.exports.carritoEditar = async (data, sessionid) => {
    try{
        const result = await db.none(config.q17, [JSON.stringify(data), sessionid])
        return result
    }catch(e){
        throw e;
    }
}

module.exports.carritoMostrar = async (id) => {
    try{
        const result = await db.any(config.q18, [id])
        return result;
    }catch(err){
        throw err
    }
}

module.exports.productosCarritoMostrar = async (data, sessionid) => {
    try{
        const result = await db.any(config.q19, [data, sessionid])
        return result;
    }catch(err){
        throw err
    }
}

