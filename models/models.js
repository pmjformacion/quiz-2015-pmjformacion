var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

// Cargar Moodelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd, 
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }      
);

/*
// Usar BBDD SQLite
var sequelize = new Sequelize(null, null, null,
						{dialect: "sqlite", storage: 'quiz.sqlite'}
						);
*/
// Importar la definición de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

// Importar la definición de la tabla Comment
var Comment = sequelize.import(path.join(__dirname, 'comment'));

// Definimos las ralación entre las tablas Quiz y Comment
Comment.belongsTo(Quiz);	// indica que un comment pertenece a un quiz.
Quiz.hasMany(Comment , {
	'constraints': true,
	'onUpdate': 'cascade',
	'onDelete': 'cascade',
	'hooks': true
});		// indica que un quiz puede tener muchos comments

exports.Quiz = Quiz; // eportar defininción de la tabla Quiz
exports.Comment = Comment; // eportar defininción de la tabla Comment

// sequelize.sync() crea e inicaliza tabla de preguntas en DB
sequelize.sync().success(function() {
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function (count) {
		if(count === 0) {	//la tabla se inicializa solo si está vacía
			Quiz.create( {pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema: 'otro'});
			Quiz.create( {pregunta: 'El descubridor de América', respuesta: 'Cristobal Colón', tema: 'humanidades'} );
			Quiz.create( {pregunta: 'Animal pesado de orejas grandes y con trompa', respuesta: 'Elefante', tema: 'ciencia'})
			.then(function(){console.log('Base de datos inicializada')});
		};
	});

});