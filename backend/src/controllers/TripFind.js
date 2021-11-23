const Trip = require('../models/Trip');

//index     , show    , store  , update , destroy
//ListarTudo, MostraUm, Incluir, Alterar, Excluir

module.exports = {
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: GET/INDEX (LISTAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 02 de agosto de 2021, 10h00
    //|Descricao.: Buscando viagem na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async index(request, response) {
        // Inicializa e carrega variável
        const { id } = request.params;

        // Localiza viagem pelo ID e carrega variável caso seja encontrado
        let trip = await Trip.findById(id);

        return response.json(trip);
    },
}