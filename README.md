## ENDPOINTS:

<!-- [Pincha aquí para probar los endpoints]() -->

### `/users (GET)`

Devuelve todos los usuarios públicos (No devuelve usuarios ocultos)

- Prueba a poner en el navegador `/users'

### `/users/:username (GET)`

Devuelve un único usuario en base al `username` (si hubiera varios, devuelve solo el primero)

- Prueba: `/users/picklerick`

### `/users/total (GET)`

Devuelve la cantidad total de usuarios públicos.

- Prueba: `/users/total`


### `/users/:country (GET)`

Devuelve usuarios de un país en concreto (`country`).

- Prueba: `/users/Colombia`

### `/users/:food (GET)`

Devuelve a todos los usuarios con una comida favorita en concreto pasada a través del enlace en `food`.

- Prueba: `/users/Ramen`

### `/users/vehicles (GET)`

Devuelve el email, username e imagen de los usuarios seleccionados:

- Si no se pasan detalles devuelve los usuarios sin vehículos.

    Prueba: `/users/vehicles`

- Si se especifica que tengan un `min` y un `max` de vehículos, se devuelven los usuarios con dicha cantidad de vehículos.

    Prueba: `/users/vehicles?min=2&max=3`

- Si se especifica `fuel`, `manufacturer` y/o `model`, se filtran los usuarios que corresponden a los parámetros especificados. Si solo se especifica uno de los tres parámetros, solo se filtra a través del mismo.

    Prueba: `/users/vehicles?manufacturer=Hyundai&model=A4`


## `/foods (GET)`

Devuelve el listado completo de las comidas registradas únicas en la base de datos. 

- Prueba: `/foods`


## `/vehicles (GET)`

Devuelve el listado completo los vehiculos únicos totales.

- Si no se especifica nada devuelve la lista completa.

    Prueba: `/vehicles`
- Si se especifica el tipo de combustible, devuelve la lista en base al tipo de combustible.
    
    Prueba: `/vehicles?fuel=Electric`


## `/users (POST)`

Crea un usuario nuevo. Como mínimo debes incluir `email`, `firstName`, `lastName` y `username`.

- Puedes usar el siguiente ejemplo, `POST` en /users con la siguiente información:

    `{
    "email": "mortysmith@C-137.dimension",
    "firstName": "Morty",
    "lastName": "Smith",
    "username": "mortysmith"
}`

    (Puedes hacer `GET` en `/users/` para ver el resultado e ir al final de la lista para ver el resultado)

## `/users/:username (PUT)`

Actualiza los datos del usuario (menos id, vehiculos, comidas y el campo deleted).

- Prueba a actualizar el usuario que acabas de crear:

    `PUT` en /users/mortysmith con la siguiente información:

    `{
    "phone": "610101010",
    "img": "https://static.wikia.nocookie.net/rickandmorty/images/e/ee/Morty501.png/revision/latest?cb=20210827150137E",
    "address": {
"street": "671 Kuphal Mountain",
"city": "Seattle",
"zipCode": "98101",
"county": "Washington State",
"country": "USA",
"planet": "Earth"}
}`

    (Puedes hacer `GET` en `/users/mortysmith` para ver los cambios)

## `/users/:username/vehicles (PUT)`

Puedes añadir vehículos a los usuarios (mínimo uno). Si no pones ninguno, no pasará nada.

- Prueba a añadir vehículos al usuario creado:

    `PUT` en `/users/mortysmith/vehicles` con la siguiente información:

    `[
{
"fuel": "Microverse-based powercell",
"manufacturer": "Rick and Morty Adventures",
"model": "Version 3.0 (Spare Morty included)",
"car": "Space Cruiser",
"type": "Spaceship"
},
{
"fuel": "Flux capacitor",
"manufacturer": "DMC",
"model": "DMC-12.",
"car": "DeLorean",
"type": "Sport travel-time car"
}
]`

    (Puedes hacer `GET` en `/users/mortysmith` para ver los cambios)


## `/users/:username/foods (PUT)`

Puedes añadir alimentos a la lista de comidas favoritas del usuario. Si no envias nada, se eliminarán todas las comidas actuales.

- Prueba a añadir comidas al usuario creado:

    `PUT` en `/users/mortysmith/foods` con la siguiente información:

    `[
"Szechuan Chicken McNugget Sauce",
"Yummy' Yums",
"Eyeholes",
"Strawberry Smiggles."
]`

    (Puedes hacer `GET` en `/users/mortysmith` para ver los cambios)

## `/users/:username/hide (PUT)`

Cambia la visibilidad del usuario para que no aparezca si se busca. Además del username en el enlace, hay que enviar el `email` que coincida con dicho usuario, de otra forma devolverá error.

 - Prueba a poner a ocultar el usuario borrado:

    `PUT` en `/users/mortysmith/hide` con el email:

    `{
    "email": "mortysmith@C-137.dimension"
    }`

    (Puedes hacer GET en /users/mortysmith para ver que ahora el usuario no es encontrado)


## `/users/:username (DELETE)`

Elimina definitivamente el usuario de la lista. Envia el `email` del usuario. IMPORTANTE! Solo se puede borrar un usuario si anteriormente se ha ocultado (es decir, el campo deleted está en true), si no devolverá un error.

- Para intentar enviar un usuario que no se puede borrar:

    `DELETE` en /users/Matt_Scholz58 con el email:

    `{
    "email": "mattscholz@bellsouth.name"
}`

- Para eliminar definitivamente un usuario que sí está oculto:

    `DELETE` en /users/mortysmith con el email:

    `{
    "email": "mortysmith@C-137.dimension"
}`


<br>
<br>


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
