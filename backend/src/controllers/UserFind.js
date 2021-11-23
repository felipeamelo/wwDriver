const User = require('../models/User');

//index     , show    , store  , update , destroy
//ListarTudo, MostraUm, Incluir, Alterar, Excluir

module.exports = {
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: GET/INDEX (LISTAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 09 de julho de 2021, 10h00
    //|Descricao.: Buscando utilizador na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async index(request, response) {
        // Inicializa e carrega variável
        const { id } = request.params;

        // Localiza utilizador pelo ID e carrega variável caso seja encontrado
        let user = await User.findById(id);

        return response.json(user);
    },
}