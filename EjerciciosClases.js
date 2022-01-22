/* CURSO MONGO */


// Se activa el demonio
mongod 


// SE INSERTA Y CREA UNA NUEVA COLECCIÓN
bd.users.insert({"name":"Angel Haro"})


// DESDE CMD PARA IMPORTAR UNA COLECCIÓN, EL CMD DEBE ESTAR PARADO EN LA MISMA RUTA
mongoimport --db miBaseDatos --collection usuarios --jsonArray --file usuarios.json
mongoimport --db miBaseDatos --collection personajes --jsonArray --file personajes.json

// PARA MOSTRAR LAS COLECCIONES
show dbs


//INSERT MULTIPLE
for(i=0; i<100; i++){ db.numeros.insert({"numero:":i}) }

//CONTEO DE ELEMENTOS DE UNA COLECCIÓN
 db.numeros.count()

// SE EXPLICA EL PLAN DE EJECUCIÓN DE LA CONSULTA
db.numeros.find({"numero:":50}).explain()
db.numeros.find({"numero:":50}).explain("executionStats")


// CREACIÓN DE INDICE
db.numeros.createIndex({numero:1})

////// CRUD

// UPDATE
db.usuarios.update({"nombre":"Angel"},{$set:{"puesto":"Subdirector"}})

// UPDATE CON INCREMENTO 
db.usuarios.update({"nombre":"Angel"},{$inc:{"edad":1}})

//UPDATE CON PARAMETROS false no lo añada si no lo encuentra y true para que actualice todos
db.usuarios.update({"nombre":"Angel"},{$inc:{"edad":1}},false, true)

//UPDATE para adicionar un campo inexistente, como no existe lo añade.
db.usuarios.update({"nombre":"Angel"},{set:{"mascota":"Luke bebe"}})

// UPDATE y creación de objeto dentro de objeto.
db.usuarios.update({"nombre":"Angel"},{set:{"dependientes":{"hija":"Daff","mascota":"Luke bebé","conyuge":"Mariana"}}},false,true)

// REMOVE
db.usuarios.remove({"nombre":"Angel"})

// ORDENAMIENTO

// ORDENAMIENTO por campo edad y 1 = ascendente. y -1 = descendente
db.usuarios.find().sort({"edad":1})

// LIMITAR BUSQUEDAD, SOLO LOS PRIMEROS 2
db.usuarios.find().limit(2)

// LIMITAR BUSQUEDAD, SOLO LOS PRIMEROS 2 y que salte el primero
db.usuarios.find().limit(2).skip(1)


//FILTROS

// Mayor > (gte -> greater equal) mayor o igual a 40
db.usuarios.count({edad:{$gte:40}})
db.usuarios.find({edad:{$gte:40}})

// Mayor > (gt -> greater) mayor a 40
db.usuarios.count({edad:{$gt:40}})
db.usuarios.find({edad:{$gt:40}})

// Menor > (lte -> lowter) menor o igual a 40
db.usuarios.count({edad:{$lte:40}})
db.usuarios.find({edad:{$lte:40}})

// Menor > (lt -> lowter) menor a 40
db.usuarios.count({edad:{$lt:40}})
db.usuarios.find({edad:{$lt:40}})


// Exist
db.usuarios.find({"mascota":{$exists:true}})


// RELACIONAR COLECCIONES
db.usuarios.update({"nombre":"Angel"},{$set:{"conyuge":ObjectId("61df9f8d67d53ecfd6fd7b16")}})

// NOTACION PUNTO COMO ENTITY FRAMEWORK
db.usuarios.find({"dependientes.hija":"Daff"})

// CURSORES

// CURSORES, sirven para almacenar el resultado de find, solo funcionan una vez
db.usuarios.find()
var cursor = db.usuarios.find()
while( cursor.hasNext() ){ print( tojson( cursor.next() ) ) }


// SELECTORES DE CONSULTAS
db.personajes.find()

// se buscan los que tengan capa
db.personajes.find({"capa":true})

// igual a 28
db.personajes.find( { "edad":{$eq:28}} )
db.personajes.find( { "edad":{$eq:28}} ).pretty()

// menores de 28
db.personajes.find( { "edad":{$lt:28}} ).pretty()

// mayores de 28
db.personajes.find( { "edad":{$gt:28}} ).pretty()
db.personajes.find( { "edad":{$gte:28}} ).pretty()

// igual a una cadena.
db.personajes.find( { "nombre":{$eq:"Pedro"}} ).pretty()

// buscar a todos lo que no sean agente
db.personajes.find( { "puesto":{$ne:"Agente"}} ).pretty()
db.personajes.find( { "puesto":{$ne:"Super héroe"}} ).pretty()

//Buscar en in
db.personajes.find( { "puesto":{$in:["Operador","Oficina"]}} ).pretty()

// No se quiere que sean operadores, oficina o agentes
db.personajes.find( { "puesto":{$nin:["Operador","Oficina","Agente"]}} ).pretty()

// Operadores logicos.  // AND
db.personajes.find({$and:[{"nombre":"Angel"},{"apellido":"Haro"}]}).pretty()

// OR
db.personajes.find({$or:[{"nombre":"Angel"},{"apellido":"Bond"}]}).pretty()

// NOR --> no sea bruce, ni agente ni edad de 28
db.personajes.find({$nor:[{"nombre":"Bruce"},{"puesto":"agente"},{"edad":28}]}).pretty()

// busqueda con type
db.personajes.find({"edad":{$type:"string"}})




// EJERCICIOS QUE SE DEBEN PASAR

// $addToSet -- devueklve un arreglo de todos lo valorers unicos que resultan de aplicar una expresion a cada documento

// group
db.ventas.find()

// se agrupan por fechas, el addToSet genera un arreglo con los diferentes campos agrupados.
db.ventas.aggregate([{$group:{"_id":{"dia":{$dayOfYear:"$fecha"},"anio":{$year:"$fecha"}},"itemsVentas":{$addToset:"item"}}}])


//CONCAT  $concat  concatena xcadenas en una sola
db.personajes.aggregate([{$project:{"descripcion":{$concat:["$nombre", " ", "$apellido", " puesto:","$puesto"]}}}])

// CONCAT ARRAY concatena arreglos en uno solo
db.invetario.aggregate([{$project:{"items":{$concatArrays:["$etiquetas","$cantidad"]}}}])


// COND  $cond  condicional if/else dentro de la agregacion.






