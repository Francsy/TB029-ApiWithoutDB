## EJERCICIO ORIGINAL:

### Antes de comenzar...

- Instalación de paquetes (`npm i`)
- Copia la información del fichero que actúa como persistente de la información (`npm run db`)
- Ejecuta el script de desarrollo!

* Si quisieras datos aleatorios y completamente nuevos para usar, ejecuta el script `npm run create`. Si quieres volver a la información original, `npm run db`

### Endpoints!

1. Crea el endpoint `/users` (`GET`) que devuelva todos los usuarios
2. Crea el endpoint `/users/:username` (`GET`) que devuelva un único usuario en base al `username` (si hubiera varios, devuelve solo el primero)
3. Crea el endpoint `/users/total` (`GET`) para devolver el total de usuarios
4. Crea el endpoint `/users/:country` (`GET`) para devolver todos los usuarios de un país en concreto recibido por `params`
5. Crea el endpoint `/users/vehicles` (`GET`) para obtener email, username e imagen de los usuarioss que tengan un mínimo y un máximo de vehículos (req.query `min` y `max`)
6. Crea el endpoint `/users/:food` (`GET`) para devolver todos los usuarios con una comida favorita en concreto a través de params
7. Crea el endpoint `/foods` (`GET`) para devolver una lista de todas las comidas registradas UNICAS de todos los usuarios
8. Crea el endpoint `/users/vehicles` (`GET`) para obtener email, username e imagen de los usuarios que tenga, al menos, un coche con los detalles pasados por query string (fuel, manufacturer y/o model. Si están los 3 se filtra por los 3, si falta alguno, se filtra solo por los que existen. Si no hay ninguno, se saca la información de los usuarios que NO TIENEN COCHES)
9. Crea el endpoint `/vehicles` (`GET`) para obtener la lista de coches únicos totales, junto con el total de ellos en base al tipo de combustible (recibido por query strings `?fuel=diesel`, por ejemplo). Si no se pasa ningún tipo de combustibles, se buscan por todo tipo de combustibles
10. Crea el endpoint `/users` (`POST`) para recibir información en `req.body` para crear un usuario nuevo. Evita que se puedan crear usuarios si no hay, en `req.body`: email, firstname, lastname y username. Genera el id automáticamente (v4) (paquete uuid, más info en: https://www.npmjs.com/package/uuid). El resto de campos, si no están, crealos vacíos
11. Crea el endpoint `/users/:username` (`PUT`) para obtener información del usuario a través de `req.body` (menos el id, los vehículos, los alimentos y el campo `deleted`) y actualiza dicho usuario
12. Crea el endpoint `/users/:username/vehicles` (`PUT`) para obtener una lista de vehículos en `req.body` (puede ser uno o muchos. Si no es ninguno, que no haga nada) y añádelos a los existentes del usuario específico (usuario a través de `params`)
13. Crea el endpoint `/users/:username/foods` (`PUT`) para obtener una lista de alimentos en `req.body`, junto con el nombre del usuario por params y añade la lista de dichos alimentos a la lista de comidas favoritas de dicho usuario. Si no se recibe ningún alimento, se eliminan todos los que tienen
14. Crea el endpoint `/users/:username/hide` (`PUT`) para recibir el email en `req.body` y cambiar la visibilidad de ese usuario para que no aparezca si se busca (se entenderá como borrado para el mismo usuario)
15. Crea el endpoint `/user/:username` (`DELETE`) para recibir en `req.body` el email y elimina definitivamente dicho usuario de la lista. Devuelve el usuario borrado. IMPORTANTE! Solo se puede borrar si el campo `deleted` está a `true`. Si no, devolverá un error
