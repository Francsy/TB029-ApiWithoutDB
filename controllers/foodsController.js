const fs = require('fs')


// const path = require('path')
// const dbPath = path.join(__dirname, '..', 'db', 'users.json')


const getData = () => {
    try {
        const result = fs.readFileSync("tmp/users.json" , 'utf8');
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