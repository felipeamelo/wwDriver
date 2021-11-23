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
        const cars = await Car.find().sort( {matricula : 1} );
        return response.json(cars);
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: POST/STORE (INCLUIR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 24 de junho de 2021, 10h00
    //|Descricao.: Incluindo veiculo na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async store(request,response) {
        let { matricula, ano, marca, modelo, bloqueado, observacao, 
              insp_period_ult      , insp_period_prx, 
              insp_ww_ult          , insp_ww_prx, 
              insp_km_ult          , insp_km_prx, 
              renov_seguro_ult     , renov_seguro_prx, 
              renov_iuc_ult        , renov_iuc_prx } = request.body;

        // Verifica se o conteúdo foi enviado, caso não foi, então atualiza a variável com o valor padrão
        if (matricula    == null) { matricula   = ""    };
        if (ano          == null) { ano         = 0     };
        if (marca        == null) { marca       = ""    };
        if (modelo       == null) { modelo      = ""    };
        if (bloqueado    == null) { bloqueado   = false };
        if (observacao   == null) { observacao  = ""    };
        if (insp_km_ult  == null) { insp_km_ult = 0     };
        if (insp_km_prx  == null) { insp_km_prx = 0     };

        // Remove os possíveis espaços no inicio e final da string
        matricula  = matricula.trim();
        marca      = marca.trim();
        modelo     = modelo.trim();
        observacao = observacao.trim();

        // Deixa tudo em maiúsculo
        matricula  = matricula.toUpperCase();
        marca      = marca.toUpperCase();
        modelo     = modelo.toUpperCase();

        //Verifica de utilizador já existe na BD
        let car = await Car.findOne({matricula});

        //Não inclui registo se utilizador já existir
        if (!car) {       
        
            car = await Car.create({
                matricula,
                ano,
                marca,
                modelo,
                bloqueado,
                observacao,
                insp_period_ult,
                insp_period_prx,
                insp_ww_ult,
                insp_ww_prx,
                insp_km_ult,
                insp_km_prx,
                renov_seguro_ult,
                renov_seguro_prx,
                renov_iuc_ult,
                renov_iuc_prx
            });
            console.log('Veiculo cadastrado com sucesso!');
        } else {
            console.log('Veiculo já cadastrado!');
        }
    
        return response.json({car});
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: PUT/UPDATE (ALTERAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 24 de junho de 2021, 10h00
    //|Descricao.: Alterando veiculo na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async update(request,response) {
        // Inicializa e carrega variáveis
        const { id } = request.params;
        let { matricula, ano, marca, modelo, bloqueado, observacao, 
            insp_period_ult      , insp_period_prx, 
            insp_ww_ult          , insp_ww_prx, 
            insp_km_ult          , insp_km_prx, 
            renov_seguro_ult     , renov_seguro_prx, 
            renov_iuc_ult        , renov_iuc_prx } = request.body;

        // Procura utilizador pelo ID e carrega variável caso localizado
        let car = await Car.findById(id);

        // Utilizador Existe?
        if (car) {
            // Verifica se o conteúdo foi enviado, caso não foi, então atualiza a variável com o valor da BD
            if (matricula          === null) { matricula          = car.matricula          };
            if (ano                === null) { ano                = car.ano                };
            if (marca              === null) { marca              = car.marca              };
            if (modelo             === null) { modelo             = car.modelo             };
            if (bloqueado          === null) { bloqueado          = car.bloqueado          };
            if (observacao         === null) { observacao         = car.observacao         };

            if (insp_period_ult    === null) { insp_period_ult    = car.insp_period_ult    };
            if (insp_period_prx    === null) { insp_period_prx    = car.insp_period_prx    };
            if (insp_ww_ult        === null) { insp_ww_ult        = car.insp_ww_ult        };
            if (insp_ww_prx        === null) { insp_ww_prx        = car.insp_ww_prx        };
            if (insp_km_ult        === null) { insp_km_ult        = car.insp_km_ult        }; 
            if (insp_km_prx        === null) { insp_km_prx        = car.insp_km_prx        };
            if (renov_seguro_ult   === null) { renov_seguro_ult   = car.renov_seguro_ult   };
            if (renov_seguro_prx   === null) { renov_seguro_prx   = car.renov_seguro_prx   };
            if (renov_iuc_ult      === null) { renov_iuc_ult      = car.renov_iuc_ult      };
            if (renov_iuc_prx      === null) { renov_iuc_prx      = car.renov_iuc_prx      };

            //Tratar quando retorno do frontend é inválido ou vazio
            if (insp_period_ult    == "Invalid date") { insp_period_ult    = null    };
            if (insp_period_prx    == "Invalid date") { insp_period_prx    = null    };
            if (insp_ww_ult        == "Invalid date") { insp_ww_ult        = null    };
            if (insp_ww_prx        == "Invalid date") { insp_ww_prx        = null    };
            if (renov_seguro_ult   == "Invalid date") { renov_seguro_ult   = null    };
            if (renov_seguro_prx   == "Invalid date") { renov_seguro_prx   = null    };
            if (renov_iuc_ult      == "Invalid date") { renov_iuc_ult      = null    };
            if (renov_iuc_prx      == "Invalid date") { renov_iuc_prx      = null    };
            //-------------------------------------------------------------------------
            if (insp_km_ult        == "undefined"   ) { insp_km_ult        = null    };
            if (insp_km_prx        == "undefined"   ) { insp_km_prx        = null    };

            // Remove os possíveis espaços no inicio e final da string
            matricula  = matricula.trim();
            marca      = marca.trim();
            modelo     = modelo.trim();
            observacao = observacao.trim();

            // Deixa tudo em maiúsculo
            matricula  = matricula.toUpperCase();
            marca      = marca.toUpperCase();
            modelo     = modelo.toUpperCase();

            // Localizada utilizador pelo ID e atualizado caso seja encontrado
            car = await Car.findByIdAndUpdate(id,
                // Definindo quais campos serão atualizados
                {
                    matricula,
                    ano,
                    marca,
                    modelo,
                    bloqueado,
                    observacao,
                    insp_period_ult,
                    insp_period_prx,
                    insp_ww_ult,
                    insp_ww_prx,
                    insp_km_ult,
                    insp_km_prx,
                    renov_seguro_ult,
                    renov_seguro_prx,
                    renov_iuc_ult,
                    renov_iuc_prx
                }
                //O parametro abaixo é para ignorar o aviso de segurança de descontinuidade do `findOneAndUpdate()` and `findOneAndDelete()`
                ,{useFindAndModify: false}
            );
            console.log("Veiculo encontrado e UPDATE executado");

        } else {
            console.log('Veiculo não localizado!');
        }
        return response.json({car});
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: DELETE/DESTROY (EXCLUIR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 24 de junho de 2021, 10h00
    //|Descricao.: Excluindo utilizador da base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async destroy(request,response) {
        // Inicializa e carrega variável
        const { id } = request.params;

        // Localiza utilizador pelo ID e carrega variável caso seja encontrado
        let car = await Car.findById(id);

        // Utilizador Existe?
        if (car) {
            // Procura utilizador pelo ID e exclui caso seja encontrado
            car = await Car.findByIdAndDelete(id);
            console.log("Veiculo encontrado e DELETADO");
        } else {
            console.log("Veiculo não localizado!");
        }
        return response.json({});
    },

}
