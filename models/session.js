module.exports.getIdFromSession = (req) => {   
    return req.session.passport.user.id_usuario;
}


module.exports.getCurrentTime = () => {
	var now = new Date();
    return now;
}




