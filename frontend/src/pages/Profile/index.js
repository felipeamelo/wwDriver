import   React, { useState, useEffect                  } from 'react';
import { Link, useHistory                              } from 'react-router-dom';
import { If, Then, ElseIf, Else                        } from 'react-if-elseif-else-render';
import { FiUsers, FiTruck, FiPower, FiList,
         FiTrash2, FiEdit, FiUnlock, FiPlus            } from 'react-icons/fi';
import   Moment                                          from 'moment';
import   logoImg                                         from '../../assets/logo.png';
import   api                                             from '../../services/api';
import './styles.css';

function Profile(props) {
    {/*Declaração das variáveis*/}
    const [cars    , setCars    ] = useState([]);
    const [users   , setUsers   ] = useState([]);
    const [trips   , setTrips   ] = useState([]);
    const [usercar , setUserCar ] = useState([]);

    const [lEhCar  , setEhCar   ] = useState(false);
    const [lEhUser , setEhUser  ] = useState(false);
    const [lEhTrip , setEhTrip  ] = useState(false);

    const history                 = useHistory();
    const wwId                    = localStorage.getItem('wwId');
    const wwName                  = localStorage.getItem('wwName');

    let wwTripsIdUser             = localStorage.getItem('wwTripsIdUser');
    let wwTripsUtilizador         = localStorage.getItem('wwTripsUtilizador');

    //alert(props.location.pathname);

    {/*Caso a variável não exista, é porque utilizador não está logado*/}
    if (!wwId)
        history.push('/');


    useEffect(() => {
        {/*Pesquisa todos os veículos cadastrados*/}
        if (props.location.pathname == '/profile/car') {
            localStorage.setItem('wwTripsIdUser',"");
            localStorage.setItem('wwTripsUtilizador',"");

            setEhCar(false)
            setEhUser(false)
            setEhTrip(false)

            setCars([])
            setUsers([])
            setTrips([])
            setUserCar([])

            setEhCar(true)
            api.get('cars')         .then(resp => {setCars(resp.data);})
            api.get('userfindscars').then(resp => {setUserCar(resp.data);})
        }
    
        {/*Pesquisa todos os utilizadores cadastrados*/}
        if (props.location.pathname == '/profile/user') {
            localStorage.setItem('wwTripsIdUser',"");
            localStorage.setItem('wwTripsUtilizador',"");

            setEhCar(false)
            setEhUser(false)
            setEhTrip(false)

            setCars([])
            setUsers([])
            setTrips([])
            setUserCar([])

            setEhUser(true)
            api.get('users').then(resp => {setUsers(resp.data);})
        }

        {/*Pesquisa todas as viagens cadastradas*/}
        if (props.location.pathname == '/profile/trip') {
            localStorage.setItem('wwTripsIdUser',"");
            localStorage.setItem('wwTripsUtilizador',"");

            setEhCar(false)
            setEhUser(false)
            setEhTrip(false)

            setCars([])
            setUsers([])
            setTrips([])
            setUserCar([])

            setEhTrip(true)
            api.get('trips').then(resp => {setTrips(resp.data);})
        }

        {/*Pesquisa todas as viagens de um determinado utilizador*/}
        if (props.location.pathname == '/profile/trips/user') {
            setEhCar(false)
            setEhUser(false)
            setEhTrip(false)

            setCars([])
            setUsers([])
            setTrips([])
            setUserCar([])

            setEhTrip(true)
            wwTripsIdUser     = localStorage.getItem('wwTripsIdUser');
            wwTripsUtilizador = localStorage.getItem('wwTripsUtilizador');
            api.get(`tripsfinduser/${wwTripsIdUser}`).then(resp => {setTrips(resp.data);})
        }

    }, [props.location.pathname]);


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleDeleteCar
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 06 de julho de 2021, 10h00
    //|Descricao.: Localiza carro pelo ID, exclui do BD e remove do FORM WEB
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleDeleteCar(id) {
        try {
            await api.delete(`cars/${id}`);
            setCars(cars.filter(car => car._id !== id))
        } catch (err) {
            alert('Erro ao excluir veículo, tente novamente.');
        }
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleEditCar
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 06 de julho de 2021, 10h00
    //|Descricao.: Atualiza variável localStorage com ID, e chama FORM WEB de edição
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleEditCar(id) {
        localStorage.setItem('wwCarEditId',id);
        history.push('/car/edit');
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleDeleteUser
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 08 de julho de 2021, 10h00
    //|Descricao.: Localiza utilizador pelo ID, exclui do BD e remove do FORM WEB
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleDeleteUser(id) {
        try {
            await api.delete(`users/${id}`);
            setUsers(users.filter(user => user._id !== id))
        } catch (err) {
            alert('Erro ao excluir utilizador, tente novamente.');
        }
    }

    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleEditUser
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 08 de julho de 2021, 10h00
    //|Descricao.: Atualiza variável localStorage com ID, e chama FORM WEB de edição
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleEditUser(id) {
        localStorage.setItem('wwUserEditId',id);
        history.push('/user/edit');
    }



    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleDeleteTrip
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 08 de julho de 2021, 10h00
    //|Descricao.: Localiza utilizador pelo ID, exclui do BD e remove do FORM WEB
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleDeleteTrip(id) {
        try {
            await api.delete(`trips/${id}`);
            setTrips(trips.filter(trip => trip._id !== id))
        } catch (err) {
            alert('Erro ao excluir viagem, tente novamente.');
        }
    }



    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleEditTrip
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 08 de julho de 2021, 10h00
    //|Descricao.: Atualiza variável localStorage com ID, e chama FORM WEB de edição
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleEditTrip(id) {
        localStorage.setItem('wwTripEditId',id);
        history.push('/trip/edit');
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleEditKey
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 08 de julho de 2021, 10h00
    //|Descricao.: Atualiza variável localStorage com ID, e chama FORM WEB de edição
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleEditKey(id) {
        localStorage.setItem('wwUserEditId',id);
        history.push('/user/key');
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleEditKey
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 08 de julho de 2021, 10h00
    //|Descricao.: Atualiza variável localStorage com ID, e chama FORM WEB de edição
    //|Observação:
    //+-----------------------------------------------------------------------------------//
    */}
    async function handleViagens(id,utilizador) {
        localStorage.setItem('wwTripsIdUser',id);
        localStorage.setItem('wwTripsUtilizador',utilizador);
        history.push('/profile/trips/user');
    }


    {/*
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: handleLogout
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 06 de julho de 2021, 10h00
    //|Descricao.: Função para fazer o logof
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    */}
    function handleLogout() {
        localStorage.clear();
        history.push('/');
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
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="WW Driver" />
                <span>Olá {wwName}</span>

                <Link className="button" to="/user"><FiPlus size={15} color="#F3470E" strokeWidth={3}></FiPlus> Utilizador</Link>
                <Link className="button" to="/car"><FiPlus size={15} color="#F3470E" strokeWidth={3}></FiPlus> Veículo</Link>
                <Link className="button" to="/trip"><FiPlus size={15} color="#F3470E" strokeWidth={3}></FiPlus> Viagem</Link>
                <button className="btnDel" onClick={handleLogout} type="button"><FiPower size={18} color="#F3470E"></FiPower></button>
            </header>

            <div className="menu">
                    <Link to="/profile/user" className="black-link">
                        <FiUsers size={16} color="#F3470E"></FiUsers>
                        Listar utilizadores
                    </Link>
                    <Link to="/profile/car" className="black-link">
                        <FiTruck size={16} color="#F3470E"></FiTruck>
                        Listar veículos
                    </Link>
                    <Link to="/profile/trip" className="black-link">
                        <FiList size={16} color="#F3470E"></FiList>
                        Listar Viagens
                    </Link>
            </div>

            {/*
            //+-----------------------------------------------------------------------------------//
            //|Funcao....: Veículos Cadastrados (HTML)
            //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
            //|Data......: 08 de julho de 2021, 10h00
            //|Descricao.: HTML que constroi a estrutura 
            //|Observação: 
            //+-----------------------------------------------------------------------------------//
            */}

            {lEhCar && (<h1>Veículos Cadastrados</h1>)}

            {lEhCar && (
                <ul>
                    {cars.map( car => (
                    <li key={car._id}>

                        <div className="grupo-dados">
                            <strong>MATRÍCULA: </strong>
                            <strong>MODELO: </strong>
                        </div>
                        <div className="grupo-dados">
                            <p>{car.matricula}</p>
                            <p>{car.modelo}</p>
                        </div>

                        <div className="grupo-dados">
                            <strong>ANO:</strong>
                            <strong>MARCA:</strong>
                        </div>

                        <div className="grupo-dados">
                            <p>{car.ano}</p>
                            <p>{car.marca}</p>
                        </div>

                        <div style={{height:15}}></div>

                        <strong>OBSERVAÇÃO:</strong>
                        <p>&nbsp;{car.observacao}</p>

                        <div className="grupo-dt-cabec">
                            <strong></strong>
                            <strong>ÚLTIMA</strong>
                            <strong>PRÓXIMA</strong>
                        </div>
                        <div style={{height:3}}></div>
                        <div className="grupo-datas">
                            <strong>Insp. Periódica</strong>
                            <If condition={car.insp_period_ult}>
                                <Then><p style={{textAlign:'center'}}>{Moment(car.insp_period_ult).format('DD-MM-YYYY')}</p></Then>
                                <Else><p style={{textAlign:'center'}}> - </p></Else>
                            </If>
                            <If condition={car.insp_period_prx}>
                                <Then><p style={{textAlign:'center'}}>{Moment(car.insp_period_prx).format('DD-MM-YYYY')}</p></Then>
                                <Else><p style={{textAlign:'center'}}> - </p></Else>
                            </If>


                            <strong className="grupo-datas-bg">Insp. WW Data</strong>
                            <If condition={car.insp_ww_ult}>
                                <Then><p className="grupo-datas-bg"style={{textAlign:'center'}}>{Moment(car.insp_ww_ult).format('DD-MM-YYYY')}</p></Then>
                                <Else><p className="grupo-datas-bg"style={{textAlign:'center'}}> - </p></Else>
                            </If>
                            <If condition={car.insp_ww_prx}>
                                <Then><p className="grupo-datas-bg"style={{textAlign:'center'}}>{Moment(car.insp_ww_prx).format('DD-MM-YYYY')}</p></Then>
                                <Else><p className="grupo-datas-bg"style={{textAlign:'center'}}> - </p></Else>
                            </If>


                            <strong>Insp. WW Km</strong>
                            <If condition={car.insp_km_ult}>
                                <Then><p style={{textAlign:'center'}}>{car.insp_km_ult} Km</p></Then>
                                <Else><p style={{textAlign:'center'}}> - </p></Else>
                            </If>
                            <If condition={car.insp_km_prx}>
                                <Then><p style={{textAlign:'center'}}>{car.insp_km_prx} Km</p></Then>
                                <Else><p style={{textAlign:'center'}}> - </p></Else>
                            </If>


                            <strong className="grupo-datas-bg">Seguro</strong>
                            <If condition={car.renov_seguro_ult}>
                                <Then><p className="grupo-datas-bg"style={{textAlign:'center'}}>{Moment(car.renov_seguro_ult).format('DD-MM-YYYY')}</p></Then>
                                <Else><p className="grupo-datas-bg"style={{textAlign:'center'}}> - </p></Else>
                            </If>
                            <If condition={car.renov_seguro_prx}>
                                <Then><p className="grupo-datas-bg"style={{textAlign:'center'}}>{Moment(car.renov_seguro_prx).format('DD-MM-YYYY')}</p></Then>
                                <Else><p className="grupo-datas-bg"style={{textAlign:'center'}}> - </p></Else>
                            </If>


                            <strong>IUC</strong>
                            <If condition={car.renov_iuc_ult}>
                                <Then><p style={{textAlign:'center'}}>{Moment(car.renov_iuc_ult).format('DD-MM-YYYY')}</p></Then>
                                <Else><p style={{textAlign:'center'}}> - </p></Else>
                            </If>
                            <If condition={car.renov_iuc_prx}>
                                <Then><p style={{textAlign:'center'}}>{Moment(car.renov_iuc_prx).format('DD-MM-YYYY')}</p></Then>
                                <Else><p style={{textAlign:'center'}}> - </p></Else>
                            </If>

                        </div>

                        {/* Verifica se o filtro retorna algo para criar o cabeçalho*/}
                        {(usercar.filter(fil => fil.veiculo[0] == car._id).length != 0) && (
                            <div className="grupo-user-cabec">
                                <strong></strong>
                                <strong>UTILIZADORES ASSOCIADOS</strong>
                                <strong></strong>
                            </div>
                        )}

                        <div style={{height:8}}></div>
            
                        {/* Insere as linhas se o filtro retorna algo*/}
                        <ul>
                        {usercar.filter(filtro => filtro.veiculo[0] == car._id).map( resultado => (
                            <li key={resultado.utilizador}>
                                <div className="grupo-datas-2">
                                    <p>{resultado.nome}</p>
                                    <p>{resultado.apelido}</p>
                                    <p>{resultado.utilizador}</p>
                                </div>
                            </li>
                        ))}
                        </ul>

                        <button onClick={() => handleDeleteCar(car._id)} type="button" className="btnDelete" title="Apagar">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                        <button onClick={() => handleEditCar(car._id)} type="button"  className="btnEdit" title="Editar">
                            <FiEdit size={20} color="#a8a8b3"></FiEdit>
                        </button>
                    </li>
                    ))}               
                </ul>
            )}

            {/*
            //+-----------------------------------------------------------------------------------//
            //|Funcao....: Utilizadores Cadastrados (HTML)
            //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
            //|Data......: 08 de julho de 2021, 10h00
            //|Descricao.: HTML que constroi a estrutura
            //|Observação: 
            //+-----------------------------------------------------------------------------------//
            */}

            {lEhUser && (<h1>Utilizadores Cadastrados</h1>)}

            {lEhUser && (
                <ul>
                    {users.map( user => (
                    <li key={user._id}>

                        <div className="grupo-dados">
                            <strong>UTILIZADOR: </strong>
                            <strong>VEÍCULO: </strong>
                        </div>


                        <div className="grupo-dados">
                            <p>{user.utilizador}</p>
                            <p>{user.veiculo[1]}</p>
                        </div>

                        <div className="grupo-dados">
                            <strong>NOME: </strong>
                            <strong>APELIDO:</strong>
                        </div>

                        <div className="grupo-dados">
                            <p>{user.nome}</p>
                            <p>{user.apelido}</p>
                        </div>

                        <div className="grupo-dados">
                            <strong>TELEMOVEL: </strong>
                            <strong>EMAIL:</strong>
                        </div>

                        <div className="grupo-dados">
                            <p>{user.telemovel}</p>
                            <p>{user.email}</p>
                        </div>

                        <div className="grupo-dt-cabec">
                            <strong></strong>
                            <strong>ACESSOS</strong>
                            <strong></strong>
                        </div>

                        <div className="grupo-dados-chk">
                            <input type="checkbox" readOnly checked={user.administrador} />
                            <strong>Administrador</strong>

                            <input type="checkbox" readOnly checked={user.bloqueado} />
                            <strong>Bloqueado</strong>
                        </div>

                        <button onClick={() => handleDeleteUser(user._id)} type="button" className="btnDelete" title="Apagar">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                        <button onClick={() => handleEditUser(user._id)} type="button"  className="btnEdit" title="Editar">
                            <FiEdit size={20} color="#a8a8b3"></FiEdit>
                        </button>
                        <button onClick={() => handleEditKey(user._id)} type="button"  className="btnKey" title="Trocar Senha">
                            <FiUnlock size={20} color="#a8a8b3"></FiUnlock>
                        </button>
                        <button onClick={() => handleViagens(user._id,user.utilizador)} type="button"  className="btnViagens" title="Listar Viagens">
                            <FiList size={20} color="#a8a8b3"></FiList>
                        </button>

                    </li>
                    ))}               
                </ul>
            )}

            {/*
            //+-----------------------------------------------------------------------------------//
            //|Funcao....: Viagens Registadas (HTML)
            //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
            //|Data......: 08 de julho de 2021, 10h00
            //|Descricao.: HTML que constroi a estrutura
            //|Observação: 
            //+-----------------------------------------------------------------------------------//
            */}

            {lEhTrip && !wwTripsUtilizador && (<h1>Viagens Registadas (todas)</h1>)}
            {lEhTrip &&  wwTripsUtilizador && (<h1>Viagens Registadas ({wwTripsUtilizador}) </h1>)}


            {lEhTrip && (
                <ul>
                    {trips.map( trip => (
                    <li key={trip._id}>
                        <div className="grupo-trip-1">
                            <strong>UTILIZADOR:</strong>
                            <strong>MATRICULA:</strong>
                        </div>
                        <div className="grupo-trip-1">
                            <p>{trip.user_utilizador}</p>
                            <p>{trip.car_matricula}</p>
                        </div>

                        <div className="grupo-trip-3a">
                            <strong>DATA</strong>
                            <strong>PERÍODO</strong>
                            <strong>DURAÇÃO</strong>
                        </div>
                        <div style={{height:5}}></div>
                        <div className="grupo-trip-3b">
                            <p>{Moment(trip.viagem_data).format('DD-MM-YYYY')}</p>
                            <p>{trip.viagem_periodo}</p>
                            <p>{trip.viagem_duracao}</p>
                        </div>

                        <div style={{height:15}}></div>
                        <div style={{height:2, background:"#003138df", borderRadius:5}}></div>
                        <div style={{height:7}}></div>

                        <div className="grupo-trip-4a">
                            <strong>ORIGEM</strong>
                            <p>{trip.local_origem}</p>
                        </div>
                        <div className="grupo-trip-4a">
                            <strong>DESTINO</strong>
                            <p>{trip.local_destino}</p>
                        </div>
                        <div className="grupo-trip-4a">
                            <strong>DISTÂNCIA</strong>
                            <p>{trip.viagem_dist_km} km</p>
                        </div>

                        <div className="grupo-trip-4a">
                            <strong>VALOR VIAGEM</strong>
                            <p>{trip.vlr_viag_bruto.toFixed(2)} €</p>
                        </div>

                        <div className="grupo-trip-4a">
                            <strong>COMISSÃO WW</strong>
                            <p>{trip.comissao_ww_vlr.toFixed(2)} €</p>
                        </div>

                        <div style={{height:10}}></div>
                        <div style={{height:2, background:"#003138df", borderRadius:5}}></div>
                        <div style={{height:10}}></div>

                        <div className="grupo-dados-chk">
                            <input type="checkbox" readOnly checked={trip.viagem_idavolta} />
                            <strong>Viagem de Ida e Volta</strong>

                            <input type="checkbox" readOnly checked={trip.comissao_ww_ok} />
                            <strong>Comissão WW foi Paga</strong>
                        </div>

                        <button onClick={() => handleDeleteTrip(trip._id)} type="button" className="btnDelete" title="Apagar">
                            <FiTrash2 size={20} color="#a8a8b3"></FiTrash2>
                        </button>
                        <button onClick={() => handleEditTrip(trip._id)} type="button"  className="btnEdit" title="Editar">
                            <FiEdit size={20} color="#a8a8b3"></FiEdit>
                        </button>

                    </li>
                    ))} 
                </ul>

            )}


        </div>
    );
}

export default Profile;