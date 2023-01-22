const fs = require('fs')

const getData = async () => {
    try {
        const result = await fs.promises.readFile('db/users.json', 'utf8');
        const dataBase = JSON.parse(result);
        return dataBase;
    } catch (error) {
        throw new Error('Error al obtener los datos de la base de datos');
    }
}

const getAllFoods = async (req, res, next) => {
    const arrData = await getData();
    const arrFoods = arrData
        .flatMap(user => user.favouritesFood)
        .filter((food, i, arr) => i === arr.indexOf(food))
    res.status(200).json({allFoods: arrFoods})
}

module.exports = { getAllFoods }