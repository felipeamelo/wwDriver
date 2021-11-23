const User = require('../models/User');

//index     , show    , store  , update , destroy
//ListarTudo, MostraUm, Incluir, Alterar, Excluir

module.exports = { 
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: GET/INDEX (LISTAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 19 de julho de 2021, 10h00
    //|Descricao.: Listar apenas utilizadores que tenham veiculos associados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async index(request, response) {
        const users = await User.find({veiculo: {$gt: ''}})
                                .sort( {utilizador : 1} )
                                .select("nome")
                                .select("apelido")
                                .select("utilizador")
                                .select("veiculo")
        return response.json(users);
    },

}