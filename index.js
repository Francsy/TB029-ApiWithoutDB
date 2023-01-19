const express = require("express");

const errorManager = require('./middlewares/errorManager')


//MÓDULOS RUTAS
const usersApiRouter = require('./routes/usersRoutes')

const app = express();
const PORT = 3000;




//RUTAS
app.use('/users', usersApiRouter)


app.use(errorManager);

app.listen(PORT, () => {
  console.info(`> Estoy arribísima en el puerto ${PORT}! ✨🦄`);
});



