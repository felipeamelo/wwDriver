import   React, { useState, useEffect                } from 'react';
import { View, Text, Image, ImageBackground, 
         TouchableOpacity, Alert                     }  from 'react-native';
import { useNavigation                               }  from '@react-navigation/native';
import { Feather                                     }  from '@expo/vector-icons';
import AsyncStorage                                     from '@react-native-async-storage/async-storage';
import styles                                           from './styles';
import imgBgd                                           from '../../assets/home_fundo.png';
import logo                                             from '../../assets/logo.png';

export default function Home() {
    const navigation  = useNavigation();
    const [cabec_user , setCabecUser ] = useState('');
    const [cabec_car  , setCabecCar  ] = useState('');

    //Filtra objeto para identificar se botão lista foi clicado
    const aNavPar = navigation.getState().routes.filter(item => [item.key>="Home-"]);

    useEffect(() => {
        console.log("Home")
        //carrega viagens quando alterado
        fCarregaDados()
    }, [aNavPar[1].params.click]);

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fCarregaDados
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 28 de outubro de 2021, 10h00
    //|Descricao.: Carrega dados do utilizador
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fCarregaDados() {
        try {
            let aUserLogin = JSON.parse(await AsyncStorage.getItem('@wwUser'));
            setCabecUser(aUserLogin.user_nome + " " + aUserLogin.user_apelido)
            setCabecCar(aUserLogin.veiculo_matricula)          

        } catch (err) {
            setLoading(false);
            console.log("Falha na chamada da api tripsfinduser: ",err);
        }

    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: Logof
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 06 de setembro de 2021, 10h00
    //|Descricao.: Botão Logof
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function Logof() {
        await AsyncStorage.removeItem('@wwUser');
        navigation.navigate('Logon')
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

                <View style={styles.container}>

                    <View style={styles.home}>
                        <Image style={styles.homeLogo} source={logo} />
                        <View style={styles.linha01}></View>
                        <Text style={styles.bemvindo}>Bem-vindo!</Text>
                        <Text style={styles.description}>{cabec_user}</Text>
                        <Text style={styles.description}>{cabec_car}</Text>
                        <View style={styles.linha01}></View>

                        <View style={styles.grupo_botao}>
                            <TouchableOpacity
                                onPress={()=>{navigation.navigate('Trip',{click: 0})}}
                                style={styles.botao}
                                activeOpacity={0.8}>
                                <Text style={styles.botao_text}>REGISTAR VIAGEM</Text>
                                <Feather name="edit-2" size={20} color="#F3470E" style={styles.botao_icon}></Feather>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.grupo_botao}>
                            <TouchableOpacity
                                onPress={()=>{navigation.navigate('TripList',{click: 0})}}
                                style={styles.botao}
                                activeOpacity={0.8}>
                                <Text style={styles.botao_text}>REGISTO DE VIAGENS</Text>
                                <Feather name="search" size={20} color="#F3470E" style={styles.botao_icon}></Feather>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.grupo_botao}>
                            <TouchableOpacity
                                onPress={()=>{navigation.navigate('UserEdit',{click: 0})}}
                                style={styles.botao}
                                activeOpacity={0.8}>
                                <Text style={styles.botao_text}>O MEU PERFIL</Text>
                                <Feather name="user" size={20} color="#F3470E" style={styles.botao_icon}></Feather>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.grupo_botao}>
                            <TouchableOpacity
                                onPress={()=>{navigation.navigate('UserPass',{click: 0})}}
                                style={styles.botao}
                                activeOpacity={0.8}>
                                <Text style={styles.botao_text}>PALAVRA-PASSE</Text>
                                <Feather name="unlock" size={20} color="#F3470E" style={styles.botao_icon}></Feather>
                            </TouchableOpacity>
                        </View>
                        
                    </View>

                </View>
                <View style={styles.botao_posicao}>
                    <TouchableOpacity
                        onPress={Logof}
                        style={styles.botao_logof}
                        activeOpacity={0.8}>
                        <Feather name="power" size={20} color="#F3470E"></Feather>
                    </TouchableOpacity>
                </View>

        </ImageBackground>

    );
}