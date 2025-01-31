const fs = require('fs')

//Ruta a la base de datos en local:
const path = require('path')
let dbPath = path.join(__dirname, '..', 'db', 'users.json')
//Ruta cambia en caso de estar en Vercel:
if(process.env.NODE_ENV === "production") {
    dbPath = process.env.DATA_PATH
}


const getData = () => {
    try {
        const result = fs.readFileSync(dbPath, 'utf8');
        const dataBase = JSON.parse(result);
        return dataBase;
    } catch (error) {
        throw new Error('Error al obtener los datos de la base de datos');
    }
}

const getAllFoods = (req, res, next) => {
    const arrData = getData();
    const arrFoods = arrData
        .flatMap(user => user.favouritesFood)
        .filter((food, i, arr) => i === arr.indexOf(food))
    res.status(200).json({allFoods: arrFoods})
}

module.exports = { getAllFoods }