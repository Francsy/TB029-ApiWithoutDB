const fs = require('fs');

// const path = require('path')
// const dbPath = path.join(__dirname, '..', 'db', 'users.json')

const getVehicles = (req, res, next) =>  {
    let dBJson = fs.readFileSync("tmp/users.json", 'utf8')
    let dataBase = JSON.parse(dBJson)
    let arrVehicles = dataBase.flatMap(user => user.vehicles)
    if (Object.keys(req.query).length === 0) {
        arrVehicles = arrVehicles.filter((vehicle, i, arr) => i === arr.indexOf(vehicle))
    } else if ('fuel' in req.query){
        const { fuel } = req.query;
        arrVehicles = arrVehicles.filter(vehicle => vehicle.fuel === fuel)
    } else {
        let error = new Error('Vehicles not found.')
        error.status = 404,
            next(error);
            return;
    }
    const vehiclesData = {
        total: arrVehicles.length,
        vehicles: arrVehicles
    }
    res.status(200).send(vehiclesData)
}

//Pruebas http://localhost:3000/vehicles?fuel=Gasoline
// http://localhost:3000/vehicles


module.exports = {getVehicles}