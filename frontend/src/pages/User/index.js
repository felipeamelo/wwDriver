import   React, { useState, useEffect } from 'react';
import { FiArrowLeft                  } from 'react-icons/fi'
import { Link, useHistory             } from 'react-router-dom';
import   Select                         from 'react-select';
import   logoImg                        from '../../assets/logo.png';
import   api                            from '../../services/api';
import './styles.css';

function Register() {
    const [nome          , setNome          ] = useState('');
    const [apelido       , setApelido       ] = useState('');
    const [utilizador    , setUtilizador    ] = useState('');
    const [email         , setEmail         ] = useState('');
    const [telemovel     , setTelemovel     ] = useState('');
    const [password      , setPassword      ] = useState('');
    const [administrador , setAdministrador ] = useState(false);
    const [bloqueado     , setBloqueado     ] = useState(false);

    const [idveiculo     , setIdVeiculo     ] = useState('');
    const [matveiculo    , setMatVeiculo    ] = useState('');
    const [allveiculo    , setAllVeiculo    ] = useState([]);
    const [carselected   , setCarSelected   ] = useState();

    const history = useHistory();
    const wwId    = localStorage.getItem('wwId');

    {/*Caso a variável não exista, é porque utilizador não está logado*/}
    if (!wwId)
        history.push('/');

    useEffect(() => {
        {/*Busca todos veiculos e carrega variável*/}
        api.get(`cars`).then(cars => {
            const todosveiculos = cars.data.map((x) => { return { "value":x._id, "label":x.matricula } } )
            setAllVeiculo(todosveiculos);
        });
    }, [wwId]);

    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleRegister
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 12 de julho de 2021, 10h00
    //|Descricao.: Função para salvar alterações 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            nome,
            apelido,
            utilizador,
            email,
            telemovel,
            password,
            administrador,
            bloqueado,
            veiculo:[idveiculo,matveiculo]
        };

        try {

            const resp = await api.post('users',data);
            history.push('/profile/user');

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
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
                    <h1>Cadastrar Utilizador</h1>
                    <p>Faça o cadastro do utilizador para ter acesso ao sistema WW Driver</p>

                    <Link to="/profile/user" className="black-link">
                        <FiArrowLeft size={16} color="#F3470E"></FiArrowLeft>
                        Voltar para Dashboard
                    </Link>
                </section>
                <form onSubmit={handleRegister}>

                    <input 
                        type="text"
                        placeholder="Utilizador"
                        value={utilizador}
                        onChange={e => setUtilizador(e.target.value)}
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
                        required
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

                    <input
                        type="password"
                        placeholder="Palavra passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="grupo-cbox">
                        <input 
                            type="checkbox"
                            defaultChecked={administrador}
                            onChange={e => setAdministrador(e.target.checked)}
                        />
                        <label>Administrador</label>
                    </div>

                    <div className="grupo-cbox">
                        <input 
                            type="checkbox"
                            defaultChecked={bloqueado}
                            onChange={e => setBloqueado(e.target.checked)}
                        />
                        <label>Bloqueado</label>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default Register;