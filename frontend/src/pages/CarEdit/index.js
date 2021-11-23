import   React, { useState, useEffect } from 'react';
import { FiArrowLeft                  } from 'react-icons/fi'
import { Link, useHistory             } from 'react-router-dom';
import   NumberFormat                   from 'react-number-format';
import   Moment                         from 'moment';
import   logoImg                        from '../../assets/logo.png';
import   api                            from '../../services/api';
import './styles.css';

function CarEdit() {

    const history = useHistory();
    const [car, setCar] = useState([]);
    const wwId    = localStorage.getItem('wwId');
    const wwCarId = localStorage.getItem('wwCarEditId');

    const [matricula        , setMatricula ] = useState('');
    const [ano              , setAno       ] = useState('');
    const [marca            , setMarca     ] = useState('');
    const [modelo           , setModelo    ] = useState('');
    const [insp_period_ult  , setIPUlt     ] = useState('');
    const [insp_period_prx  , setIPPrx     ] = useState('');
    const [insp_ww_ult      , setWWUtl     ] = useState('');
    const [insp_ww_prx      , setWWPrx     ] = useState('');
    const [insp_km_ult      , setKmUtl     ] = useState()  ;
    const [insp_km_prx      , setKmPrx     ] = useState()  ;
    const [renov_seguro_ult , setRSUlt     ] = useState('');
    const [renov_seguro_prx , setRSPrx     ] = useState('');
    const [renov_iuc_ult    , setRIUlt     ] = useState('');
    const [renov_iuc_prx    , setRIPrx     ] = useState('');
    const [observacao       , setObs       ] = useState('');

    {/*Caso a variável não exista, é porque utilizador não está logado e não tem veículo em modo edição*/}
    if (!wwId || !wwCarId)
        history.push('/profile/car');   

    {/*Pesquisa o veículo cadastrado pelo ID*/}
    useEffect(() => {
        api.get(`carfind/${wwCarId}`).then(resp => {
            setCar(resp.data);

            {/*Recarrega as variáveis com as informações da base de dados*/}
            setMatricula (       resp.data.matricula                             );
            setAno       (       resp.data.ano                                   );
            setMarca     (       resp.data.marca                                 );
            setModelo    (       resp.data.modelo                                );
            setIPUlt     (Moment(resp.data.insp_period_ult ).format('YYYY-MM-DD'));
            setIPPrx     (Moment(resp.data.insp_period_prx ).format('YYYY-MM-DD'));
            setWWUtl     (Moment(resp.data.insp_ww_ult     ).format('YYYY-MM-DD'));
            setWWPrx     (Moment(resp.data.insp_ww_prx     ).format('YYYY-MM-DD'));

            if(!resp.data.insp_km_ult) {setKmUtl()} else {setKmUtl(resp.data.insp_km_ult)};
            if(!resp.data.insp_km_prx) {setKmPrx()} else {setKmPrx(resp.data.insp_km_prx)};
            
            setRSUlt     (Moment(resp.data.renov_seguro_ult).format('YYYY-MM-DD'));
            setRSPrx     (Moment(resp.data.renov_seguro_prx).format('YYYY-MM-DD'));
            setRIUlt     (Moment(resp.data.renov_iuc_ult   ).format('YYYY-MM-DD'));
            setRIPrx     (Moment(resp.data.renov_iuc_prx   ).format('YYYY-MM-DD'));
            setObs       (       resp.data.observacao                            );

        });
    }, [wwId]);

    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleCarEdit
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 07 de julho de 2021, 10h00
    //|Descricao.: Função para salvar alterações  
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleCarEdit(e) {
        e.preventDefault();

        //Tratando variavel para gravar zero quando for null
        //if (!insp_km_ult) {setKmUtl(0)};
        //if (!insp_km_prx) {setKmPrx(0)};

        console.log(insp_km_ult);

        const data = {
            matricula,
            ano,
            marca,
            modelo,
            insp_period_ult,
            insp_period_prx,
            insp_ww_ult,
            insp_ww_prx,
            insp_km_ult,
            insp_km_prx,
            renov_seguro_ult,
            renov_seguro_prx,
            renov_iuc_ult,
            renov_iuc_prx,
            observacao
        };

        try {

            const resp = await api.put(`cars/${wwCarId}`,data);
            localStorage.setItem('wwCarEditId','');
            history.push('/profile/car');

        } catch (err) {

            alert('Erro na atualização, tente novamente.');

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
        localStorage.setItem('wwCarEditId','');
        history.push('/profile/car');
    }

    
    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: WEB
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 07 de julho de 2021, 10h00
    //|Descricao.: Construção da página WEB
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    return(

        <div className="car-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="WW Driver" />
                    <h1>Atualizar Veículo</h1>
                    <p>Atualize os dados cadastrais e do controlo do veículo.</p>

                    <Link to="/profile/car" className="black-link" onClick={handleVolar}>
                        <FiArrowLeft size={16} color="#F3470E"></FiArrowLeft>
                        Voltar para Dashboard
                    </Link>
                </section>

                <form onSubmit={handleCarEdit}>
                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="Matrícula"
                            value={matricula}
                            onChange={e => setMatricula(e.target.value)}
                            disabled
                            required
                        />
                        <input
                            type="number"
                            placeholder="Ano"
                            value={ano}
                            onChange={e => setAno(e.target.value)}
                            disabled
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Marca"
                            value={marca}
                            onChange={e => setMarca(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Modelo"
                            value={modelo}
                            onChange={e => setModelo(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{height:20}}></div>
                    
                    <div className="group-insp-rev">

                        <div className="cabec-grupo">
                            <strong>INSPEÇÕES E RENOVAÇÕES</strong>
                        </div>

                        <div className="input-group-dt">
                            <strong></strong>
                            <strong>ÚLTIMA</strong>
                            <strong>PRÓXIMA</strong>
                        </div>

                        <div className="input-group-dt">
                            <label>PERIÓDICA</label>
                            <input
                                type="date"
                                placeholder="Ult. Insp. Periódica"
                                value={insp_period_ult}
                                onChange={e => setIPUlt(e.target.value)}
                                
                            />
                            <input
                                type="date"
                                placeholder="Prox. Insp. Periódica"
                                value={insp_period_prx}
                                onChange={e => setIPPrx(e.target.value)}
                                
                            />
                        </div>

                        <div className="input-group-dt">
                            <label>W.W. DATA</label>
                            <input
                                type="date"
                                placeholder="Ult. Insp. WW"
                                value={insp_ww_ult}
                                onChange={e => setWWUtl(e.target.value)}
                                
                            />
                            <input
                                type="date"
                                placeholder="Prox. Insp. WW"
                                value={insp_ww_prx}
                                onChange={e => setWWPrx(e.target.value)}
                                
                            />
                        </div>

                        <div className="input-group-dt">
                            <label>W.W. KM</label>
                            <NumberFormat 
                                value={insp_km_ult}
                                placeholder="Ult. Insp. Km"
                                thousandSeparator={false}
                                decimalScale={0}
                                allowNegative={false}
                                suffix={' Km'} 
                                inputMode="numeric"
                                onValueChange={e => setKmUtl(e.floatValue)}
                            />
                            <NumberFormat 
                                value={insp_km_prx}
                                placeholder="Prox. Insp. Km"
                                thousandSeparator={false}
                                decimalScale={0}
                                allowNegative={false}
                                suffix={' Km'} 
                                inputMode="numeric"
                                onValueChange={e => setKmPrx(e.floatValue)}
                            />
                        </div>

                        <div className="input-group-dt">
                                <label>SEGURO</label>
                                <input
                                    type="date"
                                    placeholder="Ult. Renov. Seguro"
                                    value={renov_seguro_ult}
                                    onChange={e => setRSUlt(e.target.value)}
                                    
                                />
                                <input
                                    type="date"
                                    placeholder="Prox. Renov. Seguro"
                                    value={renov_seguro_prx}
                                    onChange={e => setRSPrx(e.target.value)}
                                    
                                />
                        </div>
                        
                        <div className="input-group-dt">
                                <label>IUC</label>
                                <input
                                    type="date"
                                    placeholder="Ult. Renov. IUC"
                                    value={renov_iuc_ult}
                                    onChange={e => setRIUlt(e.target.value)}
                                    
                                />
                                <input
                                    type="date"
                                    placeholder="Prox. Renov. IUC"
                                    value={renov_iuc_prx}
                                    onChange={e => setRIPrx(e.target.value)}
                                    
                                />
                        </div>

                    </div>

                    <div style={{height:15}}></div>

                    <textarea
                        placeholder="Observação"
                        value={observacao}
                        onChange={e => setObs(e.target.value)}
                    />
                    <div className="button-group">
                        <button className="button" onClick={handleVolar}>Cancelar</button>
                        <button className="button" type="submit">Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CarEdit;