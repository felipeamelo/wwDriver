import   React, { useState, useEffect } from 'react';
import { FiArrowLeft                  } from 'react-icons/fi'
import { Link, useHistory             } from 'react-router-dom';
import   logoImg                        from '../../assets/logo.png';
import   api                            from '../../services/api';
import './styles.css';

function UserPass() {

    const history         = useHistory();
    const [user, setUser] = useState([]);
    const wwId            = localStorage.getItem('wwId');
    const wwUserId        = localStorage.getItem('wwUserEditId');

    const [nome          , setNome          ] = useState('');
    const [apelido       , setApelido       ] = useState('');
    const [utilizador    , setUtilizador    ] = useState('');
    const [password      , setPassword      ] = useState('');
    const [confirmPass   , setConfirmPass   ] = useState('');

    {/*Caso a variável não exista, é porque utilizador não está logado*/}
    if (!wwId || !wwUserId)
        history.push('/profile/user');  


    {/*Pesquisa o utilizador cadastrado pelo ID*/}
    useEffect(() => {
        api.get(`userfind/${wwUserId}`).then(resp => {
            setUser(resp.data);

            {/*Recarrega as variáveis com as informações da base de dados*/}
            setNome           (resp.data.nome                 );
            setApelido        (resp.data.apelido              );
            setUtilizador     (resp.data.utilizador           );
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
    async function handleEditPass(e) {

        //Verifica se a palavra passe e a confirmação são iguais
        if (password !== confirmPass) {
            alert('Palavra-passe preenchido de forma diferente nos campos.');
            return;
        }

        e.preventDefault();
        const data = {
            password
        };

        try {
            const resp = await api.put(`userpass/${wwUserId}`,data);
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


    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="WW Driver" />
                    <h1>Trocar Palavra-Passe</h1>
                    <p>Altere a palavra-passe do utilizador.</p>

                    <Link to="/profile/user" className="black-link" onClick={handleVolar}>
                        <FiArrowLeft size={16} color="#F3470E"></FiArrowLeft>
                        Voltar para Dashboard
                    </Link>
                </section>
                <form onSubmit={handleEditPass}>

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
                            disabled
                            required
                        />

                        <input 
                            type="text" 
                            placeholder="Apelido"
                            value={apelido}
                            onChange={e => setApelido(e.target.value)}
                            disabled
                            required
                        />
                    </div>

                    <input 
                        type="password"
                        placeholder="Palavra-Passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <input 
                        type="password"
                        placeholder="Confirme Palavra-Passe"
                        value={confirmPass}
                        onChange={e => setConfirmPass(e.target.value)}
                        required
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

export default UserPass;