import   React, { useState } from 'react';
import { FiArrowLeft       } from 'react-icons/fi'
import { Link, useHistory  } from 'react-router-dom';
import   NumberFormat        from 'react-number-format';
import   logoImg             from '../../assets/logo.png';
import   api                 from '../../services/api';
import './styles.css';

function Register() {

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

    const history = useHistory();
    const wwId    = localStorage.getItem('wwId');

    {/*Caso a variável não exista, é porque utilizador não está logado*/}
    if (!wwId)
        history.push('/');


    async function handleRegister(e) {
        e.preventDefault();
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

            const resp = await api.post('cars',data);
            history.push('/profile/car');

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');

        }
    }

    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: WEB
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 06 de julho de 2021, 10h00
    //|Descricao.: Construção da página WEB
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    return(
        <div className="car-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="WW Driver" />
                    <h1>Cadastrar Veículo</h1>
                    <p>Faça o cadastro do veículo para controlar suas inspeções, seguros, etc.</p>

                    <Link to="/profile/car" className="black-link">
                        <FiArrowLeft size={16} color="#F3470E"></FiArrowLeft>
                        Voltar para Dashboard
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="Matrícula"
                            value={matricula}
                            onChange={e => setMatricula(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Ano"
                            value={ano}
                            onChange={e => setAno(e.target.value)}
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
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;