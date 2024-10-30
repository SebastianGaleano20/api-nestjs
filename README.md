# Backend Challenge
* Se debe crear un servicio que maneje los datos de la plataforma de gestión de proyectos.
* Si bien no hay restricción de tiempo, creemos que de 3 a 5 horas es un tiempo razonable para entregarlo con calidad.

## Diseño
Podés encontrar el diseño [acá](https://www.figma.com/file/YLDHikbDgfsZbVdEbO0H6U/Full-Stack-Test-1?node-id=1%3A1701). La referencia sirve para tener una idea clara del servicio a desarrollar.

## Definición funcional
El usuario accede a un administrador de proyectos para realizar la gestión, puede crearlos, editarlos y eliminarlos.

* El usuario puede crear proyectos y editarlos.
* El usuario puede eliminar proyectos.
* El usuario puede asignar proyectos a usuarios.
* El usuario puede buscar un proyecto.

## API REST
El objetivo es realizar la construcción de endpoint clase Projects que represente la información del proyecto como muestra el diseño.

* Realizar el schema de base de datos de proyectos(MySQL).
* El endpoint debe traer un listado de proyectos con paginado.
* Traer un solo proyecto /id.
* Realizar un POST para insertar o editar un proyecto.
* Realizar un DELETE para eliminar un proyecto.
* Debe permitir realizar una búsqueda por nombre de proyecto.
* Asignar multiples usuarios a un proyecto.
* Se debe utilizar swagger para documentar los endpoints.

## Definiciones técnicas
* El servicio debe estar realizado en Laravel, Node Express o el framework de JS que te sea más comodo utilizar.
* La aplicación debe estar publicada y debe ser accesible mediante un link(Ver Netfly, Heroku) o cualquier webserver.
* El código de la aplicación debe estar subida a un repositorio de público acceso.

## Consideraciones
* Es importante que existan las validaciones de datos, ejemplo si se solicita un proyecto que no existe.