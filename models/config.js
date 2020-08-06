const qformat = {
	select: 'SELECT * FROM e2e_usuarios WHERE'
}

const config = {
    dbUrl: 'postgres://busqoxhpfvxnjn:a7e85284633304afbee69415bc83bc096b77b4fe5a18f15ae8c5abb08eb531d5@ec2-23-20-168-40.compute-1.amazonaws.com:5432/d5o8mor31a0r5f',
    port: 5432,
    q1: 'INSERT INTO e2e_usuarios(id_usuario, alias_usuario, password_usuario, nombre_usuario, correo_usuario, tipo_usuario) VALUES (DEFAULT, $1, $2, $3, $4, $5)',
    q2:  qformat.select + ' alias_usuario = $1',
    q3:  qformat.select + ' correo_usuario = $1',
    q4:  qformat.select + ' id_usuario = $1',
    q5: 'SELECT * from e2e_establecimientos',
    q6: 'SELECT * from e2e_establecimientos WHERE id_usuario_establecimiento = $1',
    q7: 'INSERT INTO e2e_establecimientos (id_establecimiento,id_usuario_establecimiento,nombre_establecimiento,dirección_establecimiento,descripción_establecimiento,contacto_establecimiento) VALUES (DEFAULT, $1, $2, $3, $4, $5)',
    q8: 'DELETE FROM e2e_establecimientos WHERE id_establecimiento= $1 AND id_usuario_establecimiento= $2',
}




module.exports = config;