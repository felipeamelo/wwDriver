const User       = require('../models/User');
const bcrypt     = require('bcryptjs');
const jwt        = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//index     , show    , store  , update , destroy
//ListarTudo, MostraUm, Incluir, Alterar, Excluir

module.exports = {
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: GET/INDEX (LISTAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 23 de junho de 2021, 10h00
    //|Descricao.: Buscando utilizadores na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async store(request, response) {

        const { utilizador, password } = request.body;
        const user = await User.findOne({ utilizador }).select('+password');

        //Verifica se encontrou utilizador
        if (!user) {
            console.log('Utilizador não encontrado');
            return response.status(400).send({error: 'Utilizador não encontrado'});
        }

        //Verifica se palavra-passe está correta
        if (!await bcrypt.compare(password, user.password)) {
            console.log('Palavra passe inválida');
            return response.status(400).send({error: 'Palavra passe inválida'});
        }

        //Verifica se utilizador está bloqueado
        if (user.bloqueado) {
            console.log('Utilizador está bloqueado');
            return response.status(400).send({error: 'Utilizador está bloqueado'});
        }

        //Verifica se utilizador é administrador (Só administrador pode acessar)
        if (!user.administrador) {
            console.log('Utilizador não é administrador');
            return response.status(400).send({error: 'Utilizador não é administrador'});
        }

        user.password = undefined;

        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        response.send({ user, token });

    },
}