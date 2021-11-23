const User = require('../models/User');

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
    async index(request, response) {
        const users = await User.find().sort( {utilizador : 1} );
        return response.json(users);
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: POST/STORE (INCLUIR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 23 de junho de 2021, 10h00
    //|Descricao.: Incluindo utilizador na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async store(request,response) {
        let { nome, apelido, telemovel, email, utilizador, password, veiculo, administrador, bloqueado } = request.body;
    
        // Verifica se o conteúdo foi enviado, caso não foi, então atualiza a variável com o valor padrão
        if (nome          == null) { nome          = ""    };
        if (apelido       == null) { apelido       = ""    };
        if (telemovel     == null) { telemovel     = ""    };
        if (email         == null) { email         = ""    };
        if (utilizador    == null) { utilizador    = ""    };
        if (veiculo       == null) { veiculo       = [""]  };
        if (administrador == null) { administrador = false };
        if (bloqueado     == null) { bloqueado     = false };

        // Remove os possíveis espaços no inicio e final da string
        nome       = nome.trim();
        apelido    = apelido.trim();
        telemovel  = telemovel.trim();
        email      = email.trim();
        utilizador = utilizador.trim();
        veiculo    = veiculo.map(y => y.trim());

        // Deixa tudo em minúsculo
        utilizador = utilizador.toLowerCase();

        //Verifica de utilizador já existe na BD
        let user = await User.findOne({utilizador});

        //Não inclui registo se utilizador já existir
        if (!user) {       
        
            user = await User.create({
                nome, 
                apelido, 
                telemovel, 
                email, 
                utilizador, 
                password,
                veiculo, 
                administrador, 
                bloqueado
            })
        } else {
            console.log('Utilizador já cadastrado!');
        }
    
        return response.json({user});
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: PUT/UPDATE (ALTERAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 23 de junho de 2021, 10h00
    //|Descricao.: Alterando utilizador na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async update(request,response) {
        // Inicializa e carrega variáveis
        const { id } = request.params;
        let { nome, apelido, telemovel, email, veiculo, administrador, bloqueado } = request.body;

        // Procura utilizador pelo ID e carrega variável caso localizado
        let user = await User.findById(id);

        // Utilizador Existe?
        if (user) {

            // Verifica se o conteúdo foi enviado, caso não foi, então atualiza a variável com o valor da BD
            if (nome          == null) { nome          = user.nome          };
            if (apelido       == null) { apelido       = user.apelido       };
            if (telemovel     == null) { telemovel     = user.telemovel     };
            if (email         == null) { email         = user.email         };
            if (veiculo       == null) { veiculo       = user.veiculo       };
            if (administrador == null) { administrador = user.administrador };
            if (bloqueado     == null) { bloqueado     = user.bloqueado     };

            // Remove os possíveis espaços no inicio e final da string
            nome      = nome.trim();
            apelido   = apelido.trim();
            telemovel = telemovel.trim();
            email     = email.trim();
            veiculo   = veiculo.map(y => y.trim());

            // Localizada utilizador pelo ID e atualizado caso seja encontrado
            user = await User.findByIdAndUpdate(id,
                // Definindo quais campos serão atualizados
                {
                    nome,
                    apelido,
                    telemovel,
                    email,
                    veiculo,
                    administrador,
                    bloqueado
                }
                //O parametro abaixo é para ignorar o aviso de segurança de descontinuidade do `findOneAndUpdate()` and `findOneAndDelete()`
                ,{useFindAndModify: false}
            );
            console.log("Utilizador encontrado e UPDATE executado");

        } else {
            console.log('Utilizador não localizado!');
        }
        return response.json({user});
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: DELETE/DESTROY (EXCLUIR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 23 de junho de 2021, 10h00
    //|Descricao.: Excluindo utilizador da base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async destroy(request,response) {
        // Inicializa e carrega variável
        const { id } = request.params;

        // Localiza utilizador pelo ID e carrega variável caso seja encontrado
        let user = await User.findById(id);

        // Utilizador Existe?
        if (user) {
            // Procura utilizador pelo ID e exclui caso seja encontrado
            user = await User.findByIdAndDelete(id);
            console.log("Utilizador encontrado e DELETADO");
        } else {
            console.log("Utilizador não localizado!");
        }
        return response.json({});
    },
}
