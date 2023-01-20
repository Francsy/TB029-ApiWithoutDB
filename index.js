const express = require("express");

const errorManager = require('./middlewares/errorManager')


//MÓDULOS RUTAS
const usersRouter = require('./routes/usersRoutes')
const foodsRouter = require('./routes/foodsRoutes')
const app = express();
const PORT = 3000;

//RUTAS
app.use('/users', usersRouter)
app.use('/foods', foodsRouter)


app.use(errorManager);

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});



