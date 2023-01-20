const fs = require('fs')

const getData = () => {
    try{
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
    if(arrDB.some(user => user.username === search)) {
        let firstUserByUsername = arrDB.filter(user => user.username === search)[0];
        res.status(200).json(firstUserByUsername);
    } 
    else if (arrDB.some(user => user.address.country === search)) { 
        let usersByCountry = arrDB.filter(user => user.address.country === search);
        res.status(200).json(usersByCountry);
    } else if (arrDB.some(user => user.favouritesFood.includes(search))){
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
    console.log(req.query)
}
// const getUsersByCountry = (req, res, error) => {
//     let arrUsers = getData().filter(user => user.address.country === req.params.country)
//     if (arrUsers) {
//         res.status(200).json(arrUsers)
//     }
//     else {
//         error = new Error('User not found by country.')
//         error.status = 404,
//         next(error)
//     }
// }


module.exports = {
    getAllUsers,
    getUser,
    countUsers,
    usersByVehicle
}