import   React, { useState, useEffect                 } from 'react';
import { View, Text, FlatList,
         ImageBackground, TouchableOpacity, 
         Alert, ActivityIndicator                     } from 'react-native';
import { Feather                                      } from '@expo/vector-icons';
import { useNavigation, CommonActions                 } from '@react-navigation/native';
import AsyncStorage                                     from '@react-native-async-storage/async-storage';
import imgBgd                                           from '../../assets/ww.png';
import styles                                           from './styles';
import Cabec                                            from '../../components/Cabec';
import Menu                                             from '../../components/Menu';
import Titulo                                           from '../../components/Titulo';
import api                                              from '../../services/api';
import Moment                                           from "moment";

export default function TripList(props) {
    const navigation  = useNavigation();
    const [loading    , setLoading   ] = useState(false);
    const [trips      , setTrips     ] = useState([]);
    const [cabec_user , setCabecUser ] = useState('');
    const [cabec_car  , setCabecCar  ] = useState('');
    const [cabec_trip , setCabecTrip ] = useState('');

    //Filtra objeto para identificar se botão lista foi clicado
    const aNavPar = navigation.getState().routes.filter(item => [item.key>="TripList-"]);

    useEffect(() => {
        console.log("Lista de viagens")
        //carrega viagens quando alterado
        fCarregaDados()
    }, [aNavPar[1].params.click]);

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fCarregaDados
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 14 de outubro de 2021, 10h00
    //|Descricao.: Carrega viagens do utilizador logado
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fCarregaDados() {
        try {
            //Chama api e valida utilizador e palavra-passe
            setLoading(true);

            let aUserLogin = JSON.parse(await AsyncStorage.getItem('@wwUser'));
            setCabecUser(aUserLogin.user_nome + " " + aUserLogin.user_apelido)
            setCabecCar(aUserLogin.veiculo_matricula)
            setCabecTrip('777')

            const resp = await api.get('tripsfinduser/'+aUserLogin.user_id);
            setTrips(resp.data);
            
            setLoading(false);

        } catch (err) {
            setLoading(false);
            console.log("Falha na chamada da api tripsfinduser: ",err);
        }

    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: navigateTripEdit
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 17 de agosto de 2021, 10h00
    //|Descricao.: Botão Detalhes da Viagem
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function navigateTripEdit(id) {
        await AsyncStorage.removeItem('@wwTripEditId');
        await AsyncStorage.setItem('@wwTripEditId',id);
        navigation.navigate('TripEdit');
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: LAYOUT
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 17 de agosto de 2021, 10h00
    //|Descricao.: Construção do layout do App
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    return (

        <ImageBackground 
                source={imgBgd}
                resizeMode="cover"
                style={styles.imageBgd}>

                {/*----------------------------------------------------
                # barra/círculo de processamento
                ----------------------------------------------------*/}
                {loading && (
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator 
                            size="large" 
                            color="#F3470E"
                        />
                        <Text style={styles.tripProcess}>Carregando viagens realizadas...</Text>
                    </View>
                )}

                {/*----------------------------------------------------
                # Construção do ecrã após processamento da API
                ----------------------------------------------------*/}
                {!loading && (
                    <View style={styles.container}>

                        <Cabec
                            name="TripList"
                            utilizador={cabec_user}
                            matricula ={cabec_car }
                            qtd_trips ={cabec_trip}
                            />
                        {/*<Titulo>Bem-vindo!</Titulo>*/}
                        <Menu />

                        <View style={styles.contorno}>
                            <Text style={styles.tripTitTopo}>VISUALIZAR REGISTOS:</Text>

                            <FlatList
                                data={trips}
                                style={styles.tripsList}
                                keyExtractor={trip => trip._id}
                                showsVerticalScrollIndicator={true}

                                renderItem={( { item } ) => (
                                    <View style={styles.tripItem}>
                                        <View style={styles.tripTit}>
                                            <Text style={styles.triplblTit}>Viagem</Text>
                                        </View>
                                        <View style={styles.tripSub}>
                                            <Text style={styles.tripLabel}>Data:</Text>
                                            <Text style={styles.tripValue}>{Moment(item.viagem_data).format('DD-MM-YYYY')}</Text>

                                            <Text style={styles.tripLabel}></Text>

                                            <Text style={styles.tripLabel}>Valor:</Text>
                                            <Text style={styles.tripValue}>{item.vlr_viag_bruto.toFixed(2)} €</Text>
                                        </View>

                                        <View style={styles.tripSub}>
                                            <Text style={styles.tripLabel}>Destino:</Text>
                                            <Text style={styles.tripValue}>{item.local_destino.split(':')[1].trim()}</Text>
                                            <Text style={styles.tripLabel}></Text>
                                            <Text style={styles.tripValue}>{item.viagem_dist_km.toFixed(0)} Km</Text>
                                        </View>

                                        <View style={{height:5}}></View>
                                        <View style={{height:2, backgroundColor:'#ddd'}}></View>
                                        
                                        <TouchableOpacity 
                                            style={styles.btnTripDetail} 
                                            onPress={() => navigateTripEdit(item._id)}>
                                            <Text style={styles.btnTripDetailText}>Ver mais detalhes</Text>
                                            <Feather name="arrow-right" size={16} color="#F3470E"></Feather>
                                        </TouchableOpacity>

                                        <View style={{height:20}}></View>
                                        <View style={{height:3, backgroundColor:'#003139'}}></View>

                                    </View>
                                    
                                )}
                            />

                        </View>

                    </View>
                )}

        </ImageBackground>

    );
}