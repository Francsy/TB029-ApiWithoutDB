const fs = require('fs')

const getData = () => {
    const result = fs.readFileSync('db/users.json', 'utf8');
    const dataBase = JSON.parse(result);
    return dataBase;
}

const getAllUsers = (req, res, next) => {
    try {
        res.status(200).json(getData())
    } catch (error) {
        next(error)
    }
}

const getUserByUsername = (username) => {
    let dataArr = getData();
    return dataArr.filter(element => element.username === username)[0]
}

const getUser = (req, res, next) => {
    let uniqueUser = getUserByUsername(req.params.username)
    if (uniqueUser) {
        res.status(200).json(uniqueUser)
    } else {
        let error = new Error('User not found.')
        error.status = 404,
        next(error)
    }
}

// const countUsers = (req, res) => {
//     const contador = getData();
//     res.status.json
// }

module.exports = {
    getAllUsers,
    getUser
}