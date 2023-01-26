const fs = require('fs')

const path = require('path')
const dbPath = path.join(__dirname, '..', 'db', 'users.json')


const dataWriter = (req,res) => {
    const file = fs.readFileSync(dbPath, 'utf8');
    fs.writeFile("/tmp/users.json", file, function (err) {
        if (err) {
            res.status(500).json({ success: false, message: err.message });
        } else {
            res.status(200).json({ success: true, message: "Datos guardados" })
        }
    })
}

module.exports = dataWriter