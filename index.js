const express = require("express");

const errorManager = require('./middlewares/errorManager')
const loadDB = require('./scripts/loadDB')

// Si estamos en Vercel la función copia y pega users.json en la carpeta temporal
if(process.env.DATA_PATH) {
  loadDB()
}

//MÓDULOS RUTAS
const usersRouter = require('./routes/usersRoutes')
const foodsRouter = require('./routes/foodsRoutes')
const vehiclesRouter = require('./routes/vehiclesRoutes')

const app = express();
const PORT = 3000;

app.use(express.json()) //Habilita los datos a recibir

app.get('/', (req, res) => {
  res.send('Bienvenido a la base de datos!')
})

//RUTAS
app.use('/users', usersRouter)
app.use('/foods', foodsRouter)
app.use('/vehicles', vehiclesRouter)

app.use(errorManager);

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});



