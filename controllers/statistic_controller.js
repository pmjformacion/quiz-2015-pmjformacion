var models = require('../models/models.js');



// GET /quizes/statistics
exports.show = function(req, res) {
  var estadistica = {
    quizzesTot : ['Número de preguntas', 0],
    commentsTot: ['Número de comentarios totales', 0],
    commentsPub: ['Número de comentarios publicados', 0],
    commentsNoPub: ['Número de comentarios no publicados', 0],
    commentsAverage: ['Número medio de comentarios por pregunta', 0],
    quizzesComment: ['Número de preguntas con comentarios', 0],
    quizzesNoComment: ['Número de preguntas sin comentarios', 0]
  }

  // anido las llamadas para asegurarme que al hacer el render
  // todas las consultas se han ralizado
  models.Quiz.count()
  .on ('success', function(quizzesCount){  // devuelve el número de preguntas
    console.log("cuento quizzes");
    estadistica.quizzesTot[1]= quizzesCount;})
  .then( function(c){
    models.Comment.count()
    .on('success',function(commentsCount){  // devuelve el número de comentarios en total
        console.log("cuento commments");
        estadistica.commentsTot[1] = commentsCount;})
    .then(function(c) {
      models.Comment.count({where: 'publicado = 1'})
      .on('success', function(CPublihisedCount){  // devuelve el número de comentarios publicados
        console.log("cuento comments published");
        estadistica.commentsPub[1] = CPublihisedCount;})
      .then( function(c) {
        console.log("cuento quizzes with include " + new Date().toString());
        models.Quiz.count({where: 'Comments.QuizId is null', include: [{ model: models.Comment}]})
        .on ('success', function(cuenta){  // devuelve el número de PREGUNTAS CON COMENTARIO
            estadistica.quizzesNoComment[1] = cuenta;
            estadistica.quizzesComment[1] = estadistica.quizzesTot[1] - estadistica.quizzesNoComment[1];
            if ( (estadistica.quizzesTot[1] > 0)  && (estadistica.commentsTot[1] > 0) ) {
              estadistica.commentsAverage[1] = estadistica.commentsTot[1] / estadistica.quizzesTot[1] 
            }
            estadistica.commentsNoPub[1] = estadistica.commentsTot[1] - estadistica.commentsPub[1]
          }
        )
        .then( function(c) {
          console.log("render statistic/show");
          res.render('statistics/show', { statistic: estadistica, errors: []})
        })
      })
    })
  })
  .catch(function (err) { errors.push(err); }) // tratamos los posibles errores);

};

