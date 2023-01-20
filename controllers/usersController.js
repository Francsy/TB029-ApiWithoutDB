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
    let uniqueUser = getData().filter(user => user.username === req.params.username)[0];
    if (uniqueUser) {
        res.status(200).json(uniqueUser)
    } else {
        let error = new Error('User not found.')
        error.status = 404,
            next(error)
    }
}

const countUsers = (req, res, error) => {
    try {
        res.status(200).json({
            total: getData().length
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getAllUsers,
    getUser,
    countUsers,
}