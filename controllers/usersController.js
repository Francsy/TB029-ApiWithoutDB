const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const getData = () => {
    try {
        const result = fs.readFileSync('db/users.json', 'utf8');
        const dataBase = JSON.parse(result);
        return dataBase;
    } catch (error) {
        throw new Error('Error al obtener los datos de la base de datos');
    }
}

const getAllUsers = (req, res, next) => {
    try {
        res.status(200).json(getData())
    } catch (error) {
        next(error)
    }
}

const getUser = (req, res, next) => {
    let search = decodeURIComponent(req.params.searchUser);
    let arrDB = getData();
    if (arrDB.some(user => user.username === search)) {
        let firstUserByUsername = arrDB.filter(user => user.username === search)[0];
        res.status(200).json(firstUserByUsername);
    } else if (arrDB.some(user => user.address.country === search)) {
        let usersByCountry = arrDB.filter(user => user.address.country === search);
        res.status(200).json(usersByCountry);
    } else if (arrDB.some(user => user.favouritesFood.includes(search))) {
        let usersByFavFood = arrDB.filter(user => user.favouritesFood.includes(search))
        res.status(200).json(usersByFavFood)
    } else {
        let error = new Error('User not found.')
        error.status = 404,
            next(error)
    }
}

// En la función anterior: Otra opción para meter el req.params.searchUser(search) con '_' en lugar de espacios => user.address.country.split(' ').join('_') === search;

const countUsers = (req, res, next) => {
    try {
        res.status(200).json({
            total: getData().length
        })
    } catch (error) {
        next(error)
    }
}

const usersByVehicle = (req, res, next) => {
    let arrDB = getData();
    if (Object.keys(req.query).length === 0) { //Usuarios sin vehiculo
        arrDB = arrDB
            .filter(user => user.vehicles.length === 0)
            .map(user => ({ email: user.email, username: user.username, img: user.img }))
    } else if ('min' in req.query && 'max' in req.query) { //Usuarios filtrados por cantidad de vehiculos
        const { min, max } = req.query;
        arrDB = arrDB
            .filter(user => user.vehicles.length >= min && user.vehicles.length <= max)
    } else if ('fuel' in req.query || 'manufacturer' in req.query || 'model' in req.query) { //Usuarios filtrados por detalles de los vehiculos
        const { fuel, manufacturer, model } = req.query;
        if (fuel) {
            arrDB = arrDB
                .filter(user => user.vehicles.some(vehicle => vehicle.fuel === fuel))
        }
        if (manufacturer) {
            arrDB = arrDB
                .filter(user => user.vehicles.some(vehicle => vehicle.manufacturer === manufacturer))
        }
        if (model) {
            arrDB = arrDB
                .filter(user => user.vehicles.some(vehicle => vehicle.model === model))
        }
    } else {
        let error = new Error('User not found.')
        error.status = 404,
            next(error);
        return;
    }
    usersFiltered = arrDB.map(user => ({ email: user.email, username: user.username, img: user.img }))
    res.status(200).json(usersFiltered)
}

// Para probarla: vehicles?min=4&max=4
// Para probarla: http://localhost:3000/users/vehicles?manufacturer=Hyundai&model=A4


const createUser = (req, res, next) => {
    const { email, firstName, lastName, username } = req.body;
    if (email && firstName && lastName && username) {
        const newUser = {
            id: uuidv4(),
            email,
            firstName,
            lastName,
            phone: req.body.phone || '',
            img: req.body.img || '',
            username,
            address: req.body.address || {},
            vehicles: req.body.vehicles || [],
            favouritesFood: req.body.favouritesFood || [],
            deleted: false
        }
        let dataBase = getData();
        dataBase.push(newUser);
        fs.writeFile('db/users.json', JSON.stringify(dataBase), (err, data) => {
            if (err) {
                next(err);
            } else {
                console.log('Usuario guardado')
                res.status(201).json({ success: true, message: `Usuario creado` })
            }
        })
    } else {
        res.status(400).json({ success: false, message: "Datos incompletos" })
    }
}



module.exports = {
    getAllUsers,
    getUser,
    countUsers,
    usersByVehicle,
    createUser
}