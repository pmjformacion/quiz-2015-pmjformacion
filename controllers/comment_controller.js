var models = require('../models/models.js');

// GET /quizes/:quizId/comments/new
exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});
};

// POST /quizes/:quizId/comments
exports.create = function(req, res){
    var comment = models.Comment.build(
        { texto: req.body.comment.texto,
          QuizId: req.params.quizId }
    );
   
    console.log("VOY A VALORAR COMMENT !!!");
    var errors = comment.validate();//ya qe el objeto errors no tiene then(
    if (errors)
    {
        var i=0; 
        var errores = new Array();//se convierte en [] con la propiedad message por compatibilida con layout
      console.log("Valor de errors = " + errors);
        for (var prop in errors) {
          errores[i++]={message: errors[prop]};
        }       
        res.render('comments/new', {comment: comment, quizid: req.params.quizId, errors: errores});
    } else {
        comment // save: guarda en DB campo texto de comment
        .save()
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)}) ;
    }//.catch(function(error){next(error)})
};
/*  Codigo que utilizaría con versión más avanzada de sequelize 
   commit
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('comments/new.ejs', {comment: comment, errors: err.errors});
      } else {
        comment // save: guarda en DB campo texto de comment
        .save()
        .then( function(){ res.redirect('/quizes/'+req.params.quizId)}) 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  ).catch(function(error){next(error)});
*/  

