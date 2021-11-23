require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const routes    = require('./routes');
const app       = express();


// Conectando no banco de dados wwDriver
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
});

// Definindo que o backend pode ser acessado por qualquer IP
app.use(cors());

// Definindo utilização do JSON para todos os metodos
app.use(express.json());

// Adicionando as rotas na aplicação
app.use(routes);

// Definindo a porta do servidor express
app.listen(process.env.PORT || 3333);