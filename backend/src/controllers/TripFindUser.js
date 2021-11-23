const Trip = require('../models/Trip');

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
        // Inicializa e carrega variável
        const { iduser } = request.params;
        const trips = await Trip.find({user_id: iduser}).sort( {viagem_data : -1} )

        return response.json(trips);
    },

}