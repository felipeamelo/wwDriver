import   React, { useState } from 'react';
import { FiLogIn           } from 'react-icons/fi'
import { Link, useHistory  } from 'react-router-dom';
import   logoImg             from '../../assets/logo.png';
import   wwImg               from '../../assets/ww.png';
import   api                 from '../../services/api';
import './styles.css';

function Logon() {
    const [utilizador, setUtilizador ] = useState('');
    const [password  , setPassword   ] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        const data = {
            utilizador,
            password
        };

        try {
            const resp = await api.post('verify',data);
            localStorage.setItem('wwId',resp.data.user._id);
            localStorage.setItem('wwName',resp.data.user.nome);
            console.log("Login realizado com sucesso!");
            history.push('/profile');
            
        } catch (err) {
            alert('Falha no login, tente novamente.')
            console.log("Falha no login, tente novamente.");

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
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="WW Driver" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Utilizador"
                        value={utilizador}
                        onChange={e => setUtilizador(e.target.value)}
                    />
                    <input
                        type="password" 
                        placeholder="Palavra Passe"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    {/*
                    <Link to="/register" className="black-link">
                        <FiLogIn size={16} color="#F3470E"></FiLogIn>
                        Cadastrar Utilizador
                    </Link>
                    <Link to="/car" className="black-link" style={{marginTop:10}}>
                        <FiLogIn size={16} color="#F3470E"></FiLogIn>
                        Cadastrar Veículo
                    </Link>
                    */}
                </form>
            </section>
            <img src={wwImg} alt="WW" />
        </div>
    );
}

export default Logon;