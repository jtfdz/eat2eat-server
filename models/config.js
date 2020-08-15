const qformat = {
    select_u: 'SELECT * FROM e2e_usuarios WHERE',
    select_p: 'SELECT * FROM e2e_establecimientos WHERE',
    select_pro: 'SELECT * FROM e2e_productos WHERE',
    select_ca: 'SELECT * FROM e2e_carritos WHERE',
    select_special: 'SELECT * FROM e2e_productos, e2e_carritos WHERE'

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
    q7: 'INSERT INTO e2e_establecimientos (id_establecimiento,id_usuario_establecimiento,nombre_establecimiento,direccion_establecimiento,descripcion_establecimiento,contacto_establecimiento,color_establecimiento,aceptado_establecimiento,latitud_establecimiento,longitud_establecimiento) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, false, $7, $8)',
    q8: 'DELETE FROM e2e_establecimientos WHERE id_establecimiento= $1 AND id_usuario_establecimiento= $2',
    q9:  qformat.select_p + ' id_establecimiento=$1',
    q10: 'UPDATE e2e_establecimientos SET nombre_establecimiento=$1, direccion_establecimiento=$2, descripcion_establecimiento=$3, contacto_establecimiento=$4, aceptado_establecimiento=false WHERE id_establecimiento=$5 AND id_usuario_establecimiento=$6',
    q11: qformat.select_pro + '  id_establecimiento_producto=$1',
    q12: 'INSERT INTO e2e_productos(id_producto, id_establecimiento_producto, nombre_producto, tiempo_espera_producto, descripcion_producto, precio_producto) VALUES(DEFAULT, $1, $2, $3, $4, $5)',
    q13: qformat.select_pro + '  id_producto=$1',
    q14: 'UPDATE e2e_productos SET nombre_producto=$1, tiempo_espera_producto=$2, descripcion_producto=$3, precio_producto=$4  WHERE (SELECT id_establecimiento FROM e2e_establecimientos WHERE id_usuario_establecimiento=$5 AND id_establecimiento=(SELECT id_establecimiento_producto FROM e2e_productos WHERE id_producto=$6))=id_establecimiento_producto AND id_producto=$6' ,
    q15: 'DELETE FROM e2e_productos WHERE id_producto=$1 AND (SELECT id_establecimiento from e2e_establecimientos WHERE id_usuario_establecimiento=$2 AND id_establecimiento=(SELECT id_establecimiento_producto FROM e2e_productos WHERE id_producto=$1))=id_establecimiento_producto',
    q16: 'INSERT INTO e2e_carritos(id_carrito, id_usuario_carrito) VALUES(DEFAULT, (SELECT id_usuario FROM e2e_usuarios WHERE correo_usuario=$1))',
    q17: 'UPDATE e2e_carritos SET productos_carrito=array_append(productos_carrito, $1) WHERE id_usuario_carrito=$2',
    q18: qformat.select_ca + ' id_usuario_carrito=$1',
    q19: qformat.select_special + ' id_producto = ANY(ARRAY[$1]) AND id_usuario_carrito=$2',
}




module.exports = config;