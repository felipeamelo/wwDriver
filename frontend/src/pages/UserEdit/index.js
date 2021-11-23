import   React, { useState, useEffect } from 'react';
import { FiArrowLeft                  } from 'react-icons/fi'
import { Link, useHistory             } from 'react-router-dom';
import   Select                         from 'react-select';
import   logoImg                        from '../../assets/logo.png';
import   api                            from '../../services/api';
import './styles.css';

function UserEdit() {

    const history         = useHistory();
    const [user, setUser] = useState([]);
    const wwId            = localStorage.getItem('wwId');
    const wwUserId        = localStorage.getItem('wwUserEditId');

    const [nome          , setNome          ] = useState('');
    const [apelido       , setApelido       ] = useState('');
    const [utilizador    , setUtilizador    ] = useState('');
    const [email         , setEmail         ] = useState('');
    const [telemovel     , setTelemovel     ] = useState('');
    const [administrador , setAdministrador ] = useState(false);
    const [bloqueado     , setBloqueado     ] = useState(false);
    const [idveiculo     , setIdVeiculo     ] = useState('');
    const [matveiculo    , setMatVeiculo    ] = useState('');
    const [allveiculo    , setAllVeiculo    ] = useState([]);
    const [carselected   , setCarSelected   ] = useState();


    {/*Caso a variável não exista, é porque utilizador não está logado*/}
    if (!wwId || !wwUserId)
        history.push('/profile/user');  

    
    useEffect(() => {
        {/*Busca todos veiculos e carrega variável*/}
        api.get(`cars`).then(cars => {
            const todosveiculos = cars.data.map((x) => { return { "value":x._id, "label":x.matricula } } )
            setAllVeiculo(todosveiculos);
        });

        {/*Pesquisa o utilizador cadastrado pelo ID*/}
        api.get(`userfind/${wwUserId}`).then(resp => {
            setUser           (resp.data);

            {/*Recarrega as variáveis com as informações da base de dados*/}
            setNome           (resp.data.nome                 );
            setApelido        (resp.data.apelido              );
            setUtilizador     (resp.data.utilizador           );
            setEmail          (resp.data.email                );
            setTelemovel      (resp.data.telemovel            );
            setAdministrador  (resp.data.administrador        );
            setBloqueado      (resp.data.bloqueado            );
            setIdVeiculo      (resp.data.veiculo[0]           );
            setCarSelected    ({ "value":resp.data.veiculo[0], "label":resp.data.veiculo[1] });
        });



    }, [wwId]);


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleUserEdit
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 09 de julho de 2021, 10h00
    //|Descricao.: Função para salvar alterações  
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleUserEdit(e) {
        e.preventDefault();

        const data = {
            nome,
            apelido,
            utilizador,
            email,
            telemovel,
            administrador,
            bloqueado,
            veiculo:[idveiculo,matveiculo]
        };

        try {
            const resp = await api.put(`users/${wwUserId}`,data);
            localStorage.setItem('wwUserEditId','');
            history.push('/profile/user');

        } catch (err) {

            alert('Erro na atualização, tente novamente.');

        }
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleVolar
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 12 de julho de 2021, 10h00
    //|Descricao.: Função para limpar wwUserEditId e voltar para Dashboard 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    function handleVolar() {
        localStorage.setItem('wwUserEditId','');
        history.push('/profile/user');
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleChangeCar
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 12 de julho de 2021, 10h00
    //|Descricao.: Função para limpar wwUserEditId e voltar para Dashboard 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    function handleChangeCar(e) {
        if (!e) {
            setIdVeiculo("")
            setMatVeiculo("")
            setCarSelected()
            return
        }
        
        const found = allveiculo.find( car => car.value === e.value );
        if (found) {
            setIdVeiculo(found.value)
            setMatVeiculo(found.label)
            setCarSelected({ "value":found.value, "label":found.label })
        } else {
            setIdVeiculo("")
            setMatVeiculo("")
            setCarSelected()
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
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="WW Driver" />
                    <h1>Atualizar Utilizador</h1>
                    <p>Atualize os dados cadastrais e de acessos do utilizador.</p>

                    <Link to="/profile/user" className="black-link" onClick={handleVolar}>
                        <FiArrowLeft size={16} color="#F3470E"></FiArrowLeft>
                        Voltar para Dashboard
                    </Link>
                </section>
                <form onSubmit={handleUserEdit}>

                    <input 
                        type="text"
                        placeholder="Utilizador"
                        value={utilizador}
                        onChange={e => setUtilizador(e.target.value)}
                        disabled
                        required
                    />

                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            required
                        />

                        <input 
                            type="text" 
                            placeholder="Apelido"
                            value={apelido}
                            onChange={e => setApelido(e.target.value)}
                            required
                        />
                    </div>

                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        
                    />

                    <input
                        type="text"
                        placeholder="Telemóvel"
                        value={telemovel}
                        onChange={e => setTelemovel(e.target.value)}
                        required
                    />

                    <Select
                        name="veiculo"
                        inputId="veiculo"
                        options={allveiculo}
                        value={carselected}

                        className="select"
                        placeholder="Veículo"
                        onChange={e => handleChangeCar(e)}
                        isSearchable
                        isClearable
                    />

                    <div className="grupo-cbox">
                        <input 
                            type="checkbox"
                            checked={administrador}
                            onChange={e => setAdministrador(e.target.checked)}
                        />
                        <label>Administrador</label>
                    </div>

                    <div className="grupo-cbox">
                        <input 
                            type="checkbox"
                            checked={bloqueado}
                            onChange={e => setBloqueado(e.target.checked)}
                        />
                        <label>Bloqueado</label>
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

export default UserEdit;