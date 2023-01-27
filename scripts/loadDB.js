const fs = require('fs')
require('dotenv').config()

const path = require('path')
const dbPath = path.join(__dirname, '..', 'db', '/users.json')
const dataPath = process.env.DATA_PATH

const loadDB = () => {
    const file = fs.readFileSync(dbPath, 'utf8');
    fs.writeFile(dataPath, file, function (err) {
       console.log(err)
    })
}

module.exports = loadDB