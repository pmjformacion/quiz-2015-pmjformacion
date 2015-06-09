var path = require('path');

// Cargar Moodelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
						{dialect: "sqlite", storage: 'quiz.sqlite'}
						);

// Importar la definición de la tabal Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz; // eportar defininción de la tabla Quiz

// sequelize.sync() crea e inicaliza tabla de preguntas en DB
sequelize.sync().success(function() {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count) {
		if(count === 0) {	//la tabla se inicializa solo si está vacía
			Quiz.create( {pregunta: 'Capital de Italia', respuesta: 'Roma'} )
			.success(function(){console.log('Base de datos inicializada')});
		};
	});

});