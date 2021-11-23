//Importando os packages que precisamos
const { Router }     = require('express');
const authMiddleware = require('./middlewares/auth');

const UserController = require('./controllers/UserController');
const UserFind       = require('./controllers/UserFind');
const UserPass       = require('./controllers/UserPass');
const UserVerify     = require('./controllers/UserVerify');
const UserFindCars   = require('./controllers/UserFindCars');

const CarController  = require('./controllers/CarController');
const CarFind        = require('./controllers/CarFind');

const TripController = require('./controllers/TripController');
const TripFind       = require('./controllers/TripFind');
const TripFindUser   = require('./controllers/TripFindUser');

//Metodos HTTP: get(buscar), post(incluir), put(alterar), delete(excluir)
//Tipos de Parametros:
//     Query Params: request.query (filtros, ordenação, paginação)
//     Route Params: request.params (identificar um recurso na alteração ou exclusão)
//     Body        : request.body (dados para inclusão ou alteração de um registro)

//Chama package importado
const routes = Router();

//Chama validação do token, porém ao ativar, será ativado para todas rotas
//routes.use(authMiddleware);

//+-----------------------------------------------------------------------------------//
//|Funcao....: USERS
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 23 de junho de 2021, 10h00
//|Descricao.: Rotas para ações dos USERS
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para incluir utilizador
routes.post('/users', UserController.store);

//Rota para alterar utilizador
routes.put('/users/:id', UserController.update);

//Rota para excluir utilizador
routes.delete('/users/:id', UserController.destroy);

//Rota para listar utilizadores
routes.get('/users', UserController.index);

//+-----------------------------------------------------------------------------------//
//|Funcao....: CARS
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 24 de junho de 2021, 10h00
//|Descricao.: Rotas para ações dos CARS
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para incluir veiculo
routes.post('/cars', CarController.store);

//Rota para alterar veiculo
routes.put('/cars/:id', CarController.update);

//Rota para excluir veiculo
routes.delete('/cars/:id', CarController.destroy);

//Rota para listar todos veiculos
routes.get('/cars', CarController.index);

//+-----------------------------------------------------------------------------------//
//|Funcao....: TRIPS
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 21 de julho de 2021, 10h00
//|Descricao.: Rotas para ações dos TRIPS
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para incluir viagem
routes.post('/trips', TripController.store);

//Rota para alterar viagem
routes.put('/trips/:id', TripController.update);

//Rota para excluir viagem
routes.delete('/trips/:id', TripController.destroy);

//Rota para listar todas viagens
routes.get('/trips', TripController.index);

//+-----------------------------------------------------------------------------------//
//|Funcao....: CAR
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 06 de julho de 2021, 10h00
//|Descricao.: Rotas para localizar um carro pelo ID
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para localizar veiculo
routes.get('/carfind/:id', CarFind.index);


//+-----------------------------------------------------------------------------------//
//|Funcao....: USER
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 06 de julho de 2021, 10h00
//|Descricao.: Rotas para localizar um utilizador pelo ID
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para localizar utilizador
routes.get('/userfind/:id', UserFind.index);


//+-----------------------------------------------------------------------------------//
//|Funcao....: USER
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 06 de julho de 2021, 10h00
//|Descricao.: Rotas para localizar um utilizador pelo ID
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para localizar utilizador
routes.get('/tripfind/:id', TripFind.index);


//+-----------------------------------------------------------------------------------//
//|Funcao....: USER
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 06 de julho de 2021, 10h00
//|Descricao.: Rotas para localizar um utilizador pelo ID
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para localizar utilizador
routes.get('/tripsfinduser/:iduser', TripFindUser.index);


//+-----------------------------------------------------------------------------------//
//|Funcao....: USER
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 06 de julho de 2021, 10h00
//|Descricao.: Rotas para localizar um utilizador pelo ID
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para localizar utilizador
routes.put('/userpass/:id', UserPass.update);


//+-----------------------------------------------------------------------------------//
//|Funcao....: AUTENTICAR
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 28 de junho de 2021, 10h00
//|Descricao.: Rotas de autenticação
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para validar usuário e senha
routes.post('/verify', UserVerify.store);



//+-----------------------------------------------------------------------------------//
//|Funcao....: USER
//|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
//|Data......: 19 de julho de 2021, 10h00
//|Descricao.: Rotas para localizar um utilizador que tenham carro associado
//|Observação:
//+-----------------------------------------------------------------------------------//
//Rota para listar utilizadores que tenham carro associados
routes.get('/userfindscars', UserFindCars.index);

//****************************************************//
module.exports = routes;