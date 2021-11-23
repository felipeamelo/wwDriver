const User = require('../models/User');
const bcrypt = require('bcryptjs');

//index     , show    , store  , update , destroy
//ListarTudo, MostraUm, Incluir, Alterar, Excluir

module.exports = {
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: PUT/UPDATE (ALTERAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 09 de julho de 2021, 10h00
    //|Descricao.: Buscando utilizador na base de dados para alterar a senha
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async update(request, response) {
        // Inicializa e carrega variável
        const { id } = request.params;
        let { password } = request.body;

        // Localiza utilizador pelo ID e carrega variável caso seja encontrado
        let user = await User.findById(id).select('+password');

        // Utilizador Existe?
        if (user) {

            // gerando o hash
            password = bcrypt.hashSync(password);

            // Localizada utilizador pelo ID e atualizado caso seja encontrado
            user = await User.findByIdAndUpdate(id,
                // Definindo quais campos serão atualizados
                {
                    password
                }
                //O parametro abaixo é para ignorar o aviso de segurança de descontinuidade do `findOneAndUpdate()` and `findOneAndDelete()`
                ,{useFindAndModify: false}
            ).select('+password');
            console.log("Utilizador encontrado e SENHA alterada");
        } else {
            console.log('Utilizador não localizado!');
        }

        return response.json(user);
    },
}