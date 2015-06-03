# quiz-2015-pmjformacion
<h1>Objetivo:</h1> 
Crear un pequeño portal Web con un juego de adivinanzas (quizes) usando MVC y vistas adaptables a móvil. Quiz ilustra también el uso de herramientas de gestión de proyectos.


<h1>Ejercicio P2P Obligatorio</h1>

<h2>Explicación de la tarea<h2>

Crear un repositorio en Github donde subir el proyecto que se les pide desarrollar en los siguientes apartados de esta práctica.

El proyecto debe rehacer  el servidor Quiz desde cero, repitiendo los mismos pasos descritos en las transparencias de clase. No se permite clonar el repositorio oficial de la asignatura que aloja el servidor Quiz. Debe repetirse el desarrollo desde cero.

Además se deben añadir los siguientes cambios a Quiz:

<ol>
<li> Modificar el servidor Quiz para añadir un enlace en el píe de página <footer> del marco de las páginas renderizadas que apunte a la página de su proyecto en GitHub.</li>

<li> Modificar el servidor Quiz para que sirva una nueva página con los datos de los autores de la práctica. Este desarrollo se realizará en una rama llamada créditos. Cree la rama creditos y cámbiese a ella para hacer el desarrollo pedido en este apartado.

	<ul>
    <li>Crear un nuevo enlace en la barra de navegación que apunte a la página de créditos. La ruta de acceso a esta página debe ser /author.</li>
    <li>Modifique el router (routers/index.js) para que atienda las peticiones "GET /author" y sirva una nueva vista views/author.ejs con los datos de los autores o autor de la página, mostrando el nombre de los autores, su fotografía y un pequeño video (opcional) de 30 seg.</li>
</ul>
</li>
</ol>

Cuando se haya terminado este desarrollo, integrelo en la rama master, y súbalo a GitHub.

Una vez realizados y probados estos cambios, debe crearse una cuenta en heroku para desplegar allí el servidor desarrollado en esta práctica.

Se deben seguir los mismos pasos explicados en las transparencias para realizar el despliegue.

Actualice GitHub con los cambios realizados en este apartado.

El proyecto desarrollado en esta practica, junto con todas las modificaciones añadidas, debe subirse al repositorio creado en Github por los alumnos.

Entregar en el texto de la entrega a MiriadaX
<ol>
<li> El URL al despliegue en Heroku como un enlace clicable.</li>

<li>El URL al proyecto en GITHUB como un enlace clicable.</li>
</ol>
El evaluador debe comprobar que en Heroku se ha desplegado la aplicación con los cambios solicitados y que en GITHUB se ha subido el proyecto y que los cambios solicitados se han introducido en el último commit.
