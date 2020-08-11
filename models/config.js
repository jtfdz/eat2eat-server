const qformat = {
    select_u: 'SELECT * FROM e2e_usuarios WHERE',
    select_p: 'SELECT * FROM e2e_establecimientos WHERE',
}



const config = {
    dbUrl: 'postgres://busqoxhpfvxnjn:a7e85284633304afbee69415bc83bc096b77b4fe5a18f15ae8c5abb08eb531d5@ec2-23-20-168-40.compute-1.amazonaws.com:5432/d5o8mor31a0r5f',
    tabla_sesiones: 'e2e_sesiones',
    q1: 'INSERT INTO e2e_usuarios(id_usuario, alias_usuario, password_usuario, nombre_usuario, correo_usuario, tipo_usuario) VALUES (DEFAULT, $1, $2, $3, $4, $5)',
    q2:  qformat.select_u + ' alias_usuario = $1',
    q3:  qformat.select_u + ' correo_usuario = $1',
    q4:  qformat.select_u + ' id_usuario = $1',
    q5:  qformat.select_p + ' aceptado_establecimiento=true',
    q6:  qformat.select_p + ' id_usuario_establecimiento = $1',
    q7: 'INSERT INTO e2e_establecimientos (id_establecimiento,id_usuario_establecimiento,nombre_establecimiento,direccion_establecimiento,descripcion_establecimiento,contacto_establecimiento,color_establecimiento,aceptado_establecimiento) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, false)',
    q8: 'DELETE FROM e2e_establecimientos WHERE id_establecimiento= $1 AND id_usuario_establecimiento= $2',
    q9:  qformat.select_p + ' id_establecimiento=$1',
    q10: 'UPDATE e2e_establecimientos SET nombre_establecimiento=$1, direccion_establecimiento=$2, descripcion_establecimiento=$3, contacto_establecimiento=$4, aceptado_establecimiento=false WHERE id_establecimiento=$5 AND id_usuario_establecimiento=$6' 
}




module.exports = config;