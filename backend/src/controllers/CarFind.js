const Car = require('../models/Car');

//index     , show    , store  , update , destroy
//ListarTudo, MostraUm, Incluir, Alterar, Excluir

module.exports = {
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: GET/INDEX (LISTAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 24 de junho de 2021, 10h00
    //|Descricao.: Buscando veiculos na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async index(request, response) {
        // Inicializa e carrega variável
        const { id } = request.params;

        // Localiza utilizador pelo ID e carrega variável caso seja encontrado
        let car = await Car.findById(id);

        return response.json(car);
    },
}


