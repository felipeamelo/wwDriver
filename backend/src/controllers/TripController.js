const Trip = require('../models/Trip');

//index     , show    , store  , update , destroy
//ListarTudo, MostraUm, Incluir, Alterar, Excluir

module.exports = {

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: GET/INDEX (LISTAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 21 de junho de 2021, 10h00
    //|Descricao.: Buscando viagens na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async index(request, response) {
        const trips = await Trip.find().sort( {viagem_data : -1} );
        return response.json(trips);
    },

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: POST/STORE (INCLUIR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 23 de junho de 2021, 10h00
    //|Descricao.: Incluindo utilizador na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async store(request,response) {
        let { user_id         , user_utilizador, 
              car_id          , car_matricula  , 
              local_origem    , local_destino  , 
              viagem_data     , viagem_periodo , 
              viagem_duracao  , viagem_dist_km , 
              viagem_idavolta , 
              vlr_viag_bruto  , vlr_viag_liquid, 
              comissao_ww_per , comissao_ww_vlr,
              comissao_ww_ok
            } = request.body;
    
        // Verifica se o conteúdo foi enviado, caso não foi, então atualiza a variável com o valor padrão
        if (user_id          == null) { user_id          = ""           };
        if (user_utilizador  == null) { user_utilizador  = ""           };
        if (car_id           == null) { car_id           = ""           };
        if (car_matricula    == null) { car_matricula    = ""           };
        if (local_origem     == null) { local_origem     = ""           };
        if (local_destino    == null) { local_destino    = ""           };
        if (viagem_data      == null) { viagem_data      = "01/01/1900" };
        if (viagem_periodo   == null) { viagem_periodo   = ""           };
        if (viagem_duracao   == null) { viagem_duracao   = "01:00"      };
        if (viagem_dist_km   == null) { viagem_dist_km   = 0            };
        if (viagem_idavolta  == null) { viagem_idavolta  = false        };
        if (vlr_viag_bruto   == null) { vlr_viag_bruto   = 0            };
        if (vlr_viag_liquid  == null) { vlr_viag_liquid  = 0            };
        if (comissao_ww_per  == null) { comissao_ww_per  = 0            };
        if (comissao_ww_vlr  == null) { comissao_ww_vlr  = 0            };
        if (comissao_ww_ok   == null) { comissao_ww_ok   = false        };

        // Remove os possíveis espaços no inicio e final da string
        local_origem     = local_origem.trim();
        local_destino    = local_destino.trim();

        // Deixa tudo em maiúsculo
        // local_origem     = local_origem.toUpperCase();
        // local_destino    = local_destino.toUpperCase();

        //Inclui registo da viagem
        let trip = await Trip.create({
            user_id, 
            user_utilizador, 
            car_id, 
            car_matricula, 
            local_origem, 
            local_destino, 
            viagem_data, 
            viagem_periodo, 
            viagem_duracao, 
            viagem_dist_km, 
            viagem_idavolta, 
            vlr_viag_bruto, 
            vlr_viag_liquid, 
            comissao_ww_per, 
            comissao_ww_vlr,
            comissao_ww_ok
        })
        console.log('Viagem registrada!');
    
        return response.json({trip});
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: PUT/UPDATE (ALTERAR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 24 de junho de 2021, 10h00
    //|Descricao.: Alterando viagem na base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async update(request,response) {
        // Inicializa e carrega variáveis
        const { id } = request.params;

        let { user_id         , user_utilizador, 
              car_id          , car_matricula  , 
              local_origem    , local_destino  , 
              viagem_data     , viagem_periodo , 
              viagem_duracao  , viagem_dist_km , 
              viagem_idavolta , 
              vlr_viag_bruto  , vlr_viag_liquid, 
              comissao_ww_per , comissao_ww_vlr,
              comissao_ww_ok
            } = request.body;

        // Procura viagem pelo ID e carrega variável caso localizado
        let trip = await Trip.findById(id);

        // Viagem Existe?
        if (trip) {

            // Verifica se o conteúdo foi enviado, caso não foi, então atualiza a variável com o valor da BD
            if (user_id          == null) { user_id          = trip.user_id            };
            if (user_utilizador  == null) { user_utilizador  = trip.user_utilizador    };
            if (car_id           == null) { car_id           = trip.car_id             };
            if (car_matricula    == null) { car_matricula    = trip.car_matricula      };
            if (local_origem     == null) { local_origem     = trip.local_origem       };
            if (local_destino    == null) { local_destino    = trip.local_destino      };
            if (viagem_data      == null) { viagem_data      = trip.viagem_data        };
            if (viagem_periodo   == null) { viagem_periodo   = trip.viagem_periodo     };
            if (viagem_duracao   == null) { viagem_duracao   = trip.viagem_duracao     };
            if (viagem_dist_km   == null) { viagem_dist_km   = trip.viagem_dist_km     };
            if (viagem_idavolta  == null) { viagem_idavolta  = trip.viagem_idavolta    };
            if (vlr_viag_bruto   == null) { vlr_viag_bruto   = trip.vlr_viag_bruto     };
            if (vlr_viag_liquid  == null) { vlr_viag_liquid  = trip.vlr_viag_liquid    };
            if (comissao_ww_per  == null) { comissao_ww_per  = trip.comissao_ww_per    };
            if (comissao_ww_vlr  == null) { comissao_ww_vlr  = trip.comissao_ww_vlr    };
            if (comissao_ww_ok   == null) { comissao_ww_ok   = trip.comissao_ww_ok     };

            // Remove os possíveis espaços no inicio e final da string
            local_origem     = local_origem.trim();
            local_destino    = local_destino.trim();

            // Deixa tudo em maiúsculo
            // local_origem     = local_origem.toUpperCase();
            // local_destino    = local_destino.toUpperCase();

            // Localizada utilizador pelo ID e atualizado caso seja encontrado
            trip = await Trip.findByIdAndUpdate(id,
                // Definindo quais campos serão atualizados
                {
                    user_id, 
                    user_utilizador, 
                    car_id, 
                    car_matricula, 
                    local_origem, 
                    local_destino, 
                    viagem_data, 
                    viagem_periodo, 
                    viagem_duracao, 
                    viagem_dist_km, 
                    viagem_idavolta, 
                    vlr_viag_bruto, 
                    vlr_viag_liquid, 
                    comissao_ww_per, 
                    comissao_ww_vlr,
                    comissao_ww_ok
                }
                //O parametro abaixo é para ignorar o aviso de segurança de descontinuidade do `findOneAndUpdate()` and `findOneAndDelete()`
                ,{useFindAndModify: false}
            );
            console.log("Viagem encontrada e UPDATE executado");

        } else {
            console.log('Viagem não localizada!');
        }
        return response.json({trip});
    },


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: DELETE/DESTROY (EXCLUIR)
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 24 de junho de 2021, 10h00
    //|Descricao.: Excluindo viagem da base de dados
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    async destroy(request,response) {
        // Inicializa e carrega variável
        const { id } = request.params;

        // Localiza utilizador pelo ID e carrega variável caso seja encontrado
        let trip = await Trip.findById(id);

        // Utilizador Existe?
        if (trip) {
            // Procura utilizador pelo ID e exclui caso seja encontrado
            trip = await Trip.findByIdAndDelete(id);
            console.log("Viagem encontrada e DELETADA");
        } else {
            console.log("Viagem não localizada!");
        }
        return response.json({});
    },


}