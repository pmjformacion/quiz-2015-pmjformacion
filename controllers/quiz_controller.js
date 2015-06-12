var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
  console.log("el número de parametros es " + Object.keys(req.query).length);
  if ( Object.keys(req.query).length > 0) {
    var pattern = req.query.search;
    console.log("buscar " + req.query.search);
    // elimino blancos al principio de la cadena, al final de la cadena y luego 
    // sustituyo 1 o varios espacios en blanco entre palabras por un solo caracter '%%'
    var searchSQL = req.query.search.replace(/^\s+/,'').replace(/\s+$/,'').replace(/\s+/g,"%");
    searchSQL = "%" + searchSQL + "%";
    console.log("buscarSQL " + searchSQL);
    models.Quiz.findAll({where: ["pregunta like ?", searchSQL], order: 'pregunta ASC'}).then(function(quizes) { //, {order: ['pregunta', 'DESC']}])
        res.render('quizes/index_filter.ejs', {quizes: quizes, search: pattern});
      }).catch(function(error){next(error);})

  } else {
    console.log("search is undefined");
    models.Quiz.findAll().then(function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes});
    }).catch(function(error){next(error);})
    
  }
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = "Incorrecto";
  if (req.query.respuesta === req.quiz.respuesta) {
    resultado = "Correcto";
  } 
  res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};


exports.author = function(req, res) {
	res.render('author', {autores: [
			{name:'Paco Martínez', pictureURL: '/images/pmjformacion-150.png',},
			{name: 'Coautor', pictureURL: '/images/pmjformacion-bw.png'}]});
};