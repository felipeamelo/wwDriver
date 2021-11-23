import   React, { useState, useEffect } from 'react';
import { FiArrowLeft                  } from 'react-icons/fi'
import { Link, useHistory             } from 'react-router-dom';
import   Moment                         from 'moment';
import   Select                         from 'react-select';
import   NumberFormat                   from 'react-number-format';
import   logoImg                        from '../../assets/logo.png';
import   api                            from '../../services/api';
import   LocalItem                      from '../../components/LocalItem';
import   PeriodoItem                    from '../../components/PeriodoItem';
import   DuracaoItem                    from '../../components/DuracaoItem';

import './styles.css';

function Register() {

    const [user_id          , setUserId           ] = useState('');
    const [user_utilizador  , setUserUtilizador   ] = useState('');
    const [car_id           , setCarId            ] = useState('');
    const [car_matricula    , setCarMatricula     ] = useState('');
    const [local_origem     , setLocalOrigem      ] = useState('');
    const [local_destino    , setLocalDestino     ] = useState('');
    const [viagem_data      , setViagemData       ] = useState('');
    const [viagem_periodo   , setViagemPeriodo    ] = useState('');
    const [viagem_duracao   , setViagemDuracao    ] = useState('');
    const [viagem_dist_km   , setViagemDistKm     ] = useState('');
    const [viagem_idavolta  , setViagemIdaVolta   ] = useState(false);
    const [vlr_viag_bruto   , setVlrViagemBruto   ] = useState(0);
    const [vlr_viag_liquid  , setVlrViagemLiquido ] = useState(0);
    const [comissao_ww_per  , setComissaoWwPer    ] = useState(0);
    const [comissao_ww_vlr  , setComissaoWwVlr    ] = useState(0);
    const [comissao_ww_ok   , setComissaoWwOk     ] = useState(false);

    const [allveiculo       , setAllVeiculo       ] = useState([]);
    const [allusers         , setAllUsers         ] = useState([]);
    const [alllocais        , setAllLocais        ] = useState([]);
    const [allduracao       , setAllDuracao       ] = useState([]);
    const [allperiodo       , setAllPeriodo       ] = useState([]);
    const [trip             , setTrip             ] = useState([]);

    const history  = useHistory();
    const wwId     = localStorage.getItem('wwId');
    const wwTripId = localStorage.getItem('wwTripEditId');

    {/*Caso a variável não exista, é porque utilizador não está logado e não tem veículo em modo edição*/}
    if (!wwId || !wwTripId)
        history.push('/profile/trip');   

    useEffect(() => {
        {/*Busca todos veiculos e carrega variável*/}
        api.get(`cars`).then(cars => {
            const todosveiculos = cars.data.map((x) => { return { "value":x._id, "label":x.matricula } } )
            setAllVeiculo(todosveiculos);
        });

        {/*Busca todos utilizadores e carrega variável*/}
        api.get(`users`).then(users => {
            const todosusers = users.data.map((x) => { return { "value":x._id, "label":x.utilizador, "idcar":x.veiculo[0] } } )
            setAllUsers(todosusers);
        });

        const localopcao = LocalItem().map((x) => { return { "value":x.nome, "label":x.nome } } )
        setAllLocais(localopcao)

        const duracaoopcao = DuracaoItem().map((x) => { return { "value":x.tempo, "label":x.tempo } } )
        setAllDuracao(duracaoopcao)

        const periodoopcao = PeriodoItem().map((x) => { return { "value":x.parte, "label":x.parte } } )
        setAllPeriodo(periodoopcao)

        {/*Busca registo da viagem em edição e carrega variáveis*/}
        api.get(`tripfind/${wwTripId}`).then(resp => {
            setTrip(resp.data);

            {/*Recarrega as variáveis com as informações da base de dados*/}
            setUserId           (        resp.data.user_id                           );
            setUserUtilizador   (        resp.data.user_utilizador                   );
            setCarId            (        resp.data.car_id                            );
            setCarMatricula     (        resp.data.car_matricula                     );
            setLocalOrigem      (        resp.data.local_origem                      );
            setLocalDestino     (        resp.data.local_destino                     );
            setViagemData       ( Moment(resp.data.viagem_data).format('YYYY-MM-DD') );
            setViagemPeriodo    (        resp.data.viagem_periodo                    );
            setViagemDuracao    (        resp.data.viagem_duracao                    );
            setViagemDistKm     (        resp.data.viagem_dist_km                    );
            setViagemIdaVolta   (        resp.data.viagem_idavolta                   );
            setVlrViagemBruto   (        resp.data.vlr_viag_bruto                    );
            setVlrViagemLiquido (        resp.data.vlr_viag_liquid                   );
            setComissaoWwPer    (        resp.data.comissao_ww_per                   );
            setComissaoWwVlr    (        resp.data.comissao_ww_vlr                   );
            setComissaoWwOk     (        resp.data.comissao_ww_ok                    );

        });

    }, [wwId]);

    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleRegister
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 30 de julho de 2021, 10h00
    //|Descricao.: Função para atualizar dados da viagem
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleTripEdit(e) {
        e.preventDefault();
        const data = {
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
        };

        try {
            const resp = await api.put(`trips/${wwTripId}`,data);
            localStorage.setItem('wwTripEditId','');
            history.push('/profile/trip');

        } catch (err) {
            alert('Erro na atualização, tente novamente.');
        }
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleChangeVlrTrip
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 02 de agosto de 2021, 10h00
    //|Descricao.: Função para calcular comissão da WW
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    function handleChangeVlrTrip(e) {

        if (e.floatValue > 0) {
            let nVlrBruto = e.floatValue;
            let nPerComis = (comissao_ww_per/100);
            let nVlrComis = (nVlrBruto*nPerComis);
            let nVlrLiqui = (nVlrBruto-nVlrComis);

            nVlrBruto = parseFloat(nVlrBruto.toFixed(2));
            nPerComis = parseFloat(nPerComis.toFixed(2));
            nVlrComis = parseFloat(nVlrComis.toFixed(2));
            nVlrLiqui = parseFloat(nVlrLiqui.toFixed(2));

            setVlrViagemBruto(nVlrBruto);
            setComissaoWwVlr(nVlrComis);
            setVlrViagemLiquido(nVlrLiqui);
        } else {
            setVlrViagemBruto(0);
            setComissaoWwVlr(0);
            setVlrViagemLiquido(0);
        }
    }

    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleVolar
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 07 de julho de 2021, 10h00
    //|Descricao.: Função para limpar wwCarEditId e voltar para Dashboard  
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    function handleVolar() {
        localStorage.setItem('wwTripEditId','');
        history.push('/profile/trip');
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: WEB
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 30 de julho de 2021, 10h00
    //|Descricao.: Construção da página WEB
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    return(
        <div className="trip-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="WW Driver" />
                    <h1>Atualizar Viagem</h1>
                    <p>Atualize as informações da viagem e o controlo de pagamento da comissão.</p>

                    <Link to="/profile/trip" className="black-link" onClick={handleVolar}>
                        <FiArrowLeft size={16} color="#F3470E"></FiArrowLeft>
                        Voltar para Dashboard
                    </Link>
                </section>
                <form onSubmit={handleTripEdit}>
                    <div className="input-group">

                    <div className="input-group">
                        <Select
                            name="utilizador"
                            inputId="utilizador"
                            options={allusers}
                            value={{ "value":user_id, "label":user_utilizador }}
                            className="select"
                            placeholder="Utilizador"
                            isSearchable
                            isDisabled
                        />

                        <Select
                            name="veiculo"
                            inputId="veiculo"
                            options={allveiculo}
                            value={{ "value":car_id, "label":car_matricula }}

                            className="select"
                            placeholder="Veículo"
                            isSearchable
                            isDisabled 
                        />
                    </div>


                    </div>
                    


                    <div style={{height:15}}></div>
    
                    <div className="input-group-2">

                        <div className="input-group-3">
                            <strong>DATA</strong>
                            <strong>PERÍODO</strong>
                            <strong>DURAÇÃO</strong>
                        </div>
                        <div style={{height:10}}></div>
                        <div className="input-group-4">
                            <input
                                type="date"
                                value={viagem_data}
                                onChange={e => setViagemData(e.target.value)}
                                required
                                disabled
                            />


                            <Select
                                name="periodo"
                                inputId="periodo"
                                options={allperiodo}
                                value={{ "value":viagem_periodo, "label":viagem_periodo }}
                                className="select"
                                placeholder="Período"
                                onChange={e => setViagemPeriodo(e.value)}
                                isSearchable
                            />

                            <Select
                                name="duracao"
                                inputId="duracao"
                                options={allduracao}
                                value={{ "value":viagem_duracao, "label":viagem_duracao }}
                                className="select"
                                placeholder="Duração"
                                onChange={e => setViagemDuracao(e.value)}
                                isSearchable
                            />

                        </div>

                    </div>

                    <div style={{height:15}}></div>

                    <div className="input-group-2">
                        <div className="input-group-5">
                            <strong>ORIGEM</strong>
                            <Select
                                name="origem"
                                inputId="origem"
                                options={alllocais}
                                value={{ "value":local_origem, "label":local_origem }}
                                className="select"
                                placeholder="Origem"
                                onChange={e => setLocalOrigem(e.value)}
                                isSearchable
                            />
                        </div>
                        <div className="input-group-5">
                            <strong>DESTINO</strong>
                            <Select
                                name="destino"
                                inputId="destino"
                                options={alllocais}
                                value={{ "value":local_destino, "label":local_destino }}
                                className="select"
                                placeholder="Destino"
                                onChange={e => setLocalDestino(e.value)}
                                isSearchable
                            />
                        </div>
                        <div className="input-group-5">
                            <strong>DISTÂNCIA</strong>
                            <NumberFormat 
                                value={viagem_dist_km}
                                placeholder="Distância Km"
                                thousandSeparator={false}
                                decimalScale={0}
                                allowNegative={false}
                                suffix={' Km'} 
                                inputMode="numeric"
                                onValueChange={e => setViagemDistKm(e.floatValue)}
                            />
                        </div>


                        <div className="input-group-5">
                            <strong>VALOR VIAGEM</strong>
                            <NumberFormat 
                                value={vlr_viag_bruto}
                                placeholder="Valor Viagem €"
                                thousandSeparator={false} 
                                decimalSeparator={","}
                                decimalScale={2}
                                allowNegative={false}
                                suffix={' €'} 
                                inputMode="numeric"
                                onValueChange={e => handleChangeVlrTrip(e)}
                                disabled={true}
                            />
                        </div>

                        <div className="input-group-5">
                            <strong>COMISSÃO WW</strong>
                            <NumberFormat 
                                value={comissao_ww_vlr}
                                placeholder="Comissão WW €"
                                thousandSeparator={false} 
                                decimalSeparator={","}
                                decimalScale={2}
                                allowNegative={false}
                                suffix={' €'} 
                                inputMode="numeric"
                                disabled={true}
                            />
                        </div>


                    </div>

                    <div style={{height:15}}></div>

                    <div className="input-group-2">
                        <div className="grupo-cbox">
                            <input 
                                type="checkbox"
                                checked={viagem_idavolta}
                                onChange={e => setViagemIdaVolta(e.target.checked)}
                            />
                            <label>Viagem de Ida e Volta</label>
                        </div>

                        <div className="grupo-cbox">
                            <input 
                                type="checkbox"
                                checked={comissao_ww_ok}
                                onChange={e => setComissaoWwOk(e.target.checked)}
                            />
                            <label>Comissão WW foi Paga</label>
                        </div>
                    </div>

                    <div className="button-group">
                        <button className="button" onClick={handleVolar}>Cancelar</button>
                        <button className="button" type="submit">Confirmar</button>
                    </div>

                </form>
            </div>
        </div>
    );



}

export default Register;