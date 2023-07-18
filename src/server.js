require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations")

const AppError = require("./utils/AppError")
//importando pasta express de node_modules
const express = require("express");


const routes = require("./routes")

migrationsRun();


//criando express
const app = express();
//criando porta que API vai esperar requisição


//extrair a requisição que foi feita e o recurso que foi utilizado para fazer a resposta
//recurso -> message
//parametro -> id, user 

app.use(express.json());

app.use(routes);



app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  });
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));