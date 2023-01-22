const fs = require('fs');
const { get } = require('http');
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
        let dataBase = getData().filter(user => user.deleted === false)
        res.status(200).json(dataBase)
    } catch (error) {
        next(error)
    }
}

const getUser = (req, res, next) => {
    let search = decodeURIComponent(req.params.searchUser);
    let arrDB = getData().filter(user => user.deleted === false);
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
            total: getData().filter(user => user.deleted === false).length
        })
    } catch (error) {
        next(error)
    }
}

const usersByVehicle = (req, res, next) => {
    let arrDB = getData().filter(user => user.deleted === false);
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

const updateUser = (req, res, next) => {
    const paramUsername = req.params.username;
    let dataBase = getData();
    if (Object.keys(req.body).length === 0) {
        res.status(422).json({ success: false, message: 'Datos proporcionados incompletos.' })
    } else if (!dataBase.find(user => user.username === paramUsername)) {
        res.status(404).json({ success: false, message: `${req.params.username} no existe.` })
    } else {
        const { email, firstName, lastName, phone, img, username, address } = req.body;
        const updatedDB = dataBase.map(user => {
            if (user.username === paramUsername) {
                user.email = email || user.email;
                user.firstName = firstName || user.firstName;
                user.lastName = lastName || user.lastName;
                user.phone = phone || user.phone;
                user.username = username || user.username;
                user.address = address || user.address;
                return user;
            }
            return user;
        })
        fs.writeFile('db/users.json', JSON.stringify(updatedDB), (err, data) => {
            if (err) {
                next(err);
            } else {
                console.log('Usuario actualizado')
                res.status(200).json({ success: true, message: `Usuario actualizado` })
            }
        })
    }
}

const addVehicles = (req, res, next) => {
    const { username } = req.params;
    const vehiclesList = req.body;
    let dataBase = getData();
    if (vehiclesList.length === 0 || Object.keys(vehiclesList).length === 0) {
        res.status(422).json({ success: false, message: 'Datos proporcionados incompletos.' })
    } else if (!dataBase.find(user => user.username === username)) {
        res.status(404).json({ success: false, message: `${req.params.username} no existe.` })
    } else {
        const updatedDB = dataBase.map(user => {
            if (user.username === username) {
                user.vehicles = user.vehicles.concat(vehiclesList);
                return user;
            }
            return user;
        })
        fs.writeFile('db/users.json', JSON.stringify(updatedDB), (err, data) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json({ success: true, message: `Vehiculos añadidos` })
            }
        })
    }
}

const addFoods = (req, res, next) => {
    const { username } = req.params;
    const foodsList = req.body;
    let dataBase = getData();
    if (!dataBase.find(user => user.username === username)) {
        res.status(404).json({ success: false, message: `${req.params.username} no existe.` })
    } else {
        let userToChange = dataBase.find(user => user.username === username)
        let foodsDeleted = false
        if (foodsList.length === 0 || Object.keys(foodsList).length === 0) {
            userToChange.favouritesFood = [];
            foodsDeleted = true;
        } else {
            userToChange.favouritesFood = userToChange.favouritesFood.concat(foodsList)
        }
        fs.writeFile('db/users.json', JSON.stringify(dataBase), (err, data) => {
            if (err) {
                next(err);
            } else {
                foodsDeleted ? res.status(200).json({ success: true, message: `Lista de comidas eliminada` }) : res.status(200).json({ success: true, message: `Lista de comidas añadidas` })
            }
        })
    }
}

const hideUser = (req, res, next) => {
    const { username } = req.params;
    const { email } = req.body;
    let dataBase = getData();
    if (Object.keys(req.body).length === 0 || !email) {
        res.status(422).json({ success: false, message: 'Datos proporcionados incorrectos.' })
    } else if (dataBase.some(user => user.username === username && user.email === email)) {
        let userToHide = dataBase.find(user => user.username === username);
        userToHide.deleted = true;
        fs.writeFile('db/users.json', JSON.stringify(dataBase), (err, data) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json({ success: true, message: `${username} con email ${email} fue ocultado con éxito` })
            }
        })
    } else {
        res.status(404).json({ success: false, message: `El usernane ${username} y/o el email ${email} no coincide con ningún usuario.` })
    }
}

const deleteUser = (req, res, next) => {
    const { username } = req.params;
    const { email } = req.body;
    let dataBase = getData();
    if (Object.keys(req.body).length === 0 || !email) {
        res.status(422).json({ success: false, message: 'Datos proporcionados incorrectos.' })
    } else if (!dataBase.some(user => user.username === username && user.email === email)){
        res.status(404).json({ success: false, message: `El usernane ${username} y/o el email ${email} no coincide con ningún usuario.` })
    } else {
        let userToDelete = dataBase.find(user => user.username === username);
        if(userToDelete.deleted === false) {
            res.status(409).json({ success: false, messaage: `El usuario ${username} no puede ser eliminado`})
        } else {
            let userIndex = dataBase.findIndex(user => user.username === username)
            dataBase.splice(userIndex, 1)
            fs.writeFile('db/users.json', JSON.stringify(dataBase), (err, data) => {
                if (err) {
                    next(err);
                } else {
                    res.status(200).json({ success: true, message: `Usuarion ${username} con email ${email} fue eliminado con éxito` })
                }
            })
        }
    }
}


module.exports = {
    getAllUsers,
    getUser,
    countUsers,
    usersByVehicle,
    createUser,
    updateUser,
    addVehicles,
    addFoods,
    hideUser,
    deleteUser
}