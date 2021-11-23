import React, { useState, useEffect                  }  from 'react';
import { View, Text, TextInput, ImageBackground, 
         ScrollView, TouchableOpacity, 
         Alert, ActivityIndicator                    }  from 'react-native';
import { useNavigation                               }  from '@react-navigation/native';
import { Feather                                     }  from '@expo/vector-icons';
import styles                                           from './styles';
import AsyncStorage                                     from '@react-native-async-storage/async-storage';
import imgBgd                                           from '../../assets/ww.png';
import Cabec                                            from '../../components/Cabec';
import Menu                                             from '../../components/Menu';
import Titulo                                           from '../../components/Titulo';
import api                                              from '../../services/api';

export default function UserEdit() {
    const navigation = useNavigation();
    const [loading     , setLoading    ] = useState(false);
    //-----------------------------------------
    const [user_id     , setUserId     ] = useState('');
    const [utilizador  , setUtilizador ] = useState('');
    const [nome        , setNome       ] = useState('');
    const [apelido     , setApelido    ] = useState('');
    const [email       , setEmail      ] = useState('');
    const [telemovel   , setTelemovel  ] = useState('');
    const [matricula   , setMatricula  ] = useState('');    
    const [car_id      , setCarId      ] = useState('');    
    //-----------------------------------------
    const [cabec_user  , setCabecUser  ] = useState('');
    const [cabec_car   , setCabecCar   ] = useState('');
    const [cabec_trip  , setCabecTrip  ] = useState('');

    //Filtra objeto para identificar se botão lista foi clicado
    const aNavPar = navigation.getState().routes.filter(item => [item.key>="UserEdit-"]);

    useEffect(() => {
        console.log("Tela Perfil")
        fUserEditDados()
    },[aNavPar[1].params.click]);

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fUserCarregaDados
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 15 de outubro de 2021, 10h00
    //|Descricao.: Carrega viagens do utilizador logado
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fUserEditDados() {
        try {
            setLoading(true);
            //-----------------------------------------
            let aUserLogin = JSON.parse(await AsyncStorage.getItem('@wwUser'));
            //-----------------------------------------
            setCabecUser(aUserLogin.user_nome + " " + aUserLogin.user_apelido)
            setCabecCar(aUserLogin.veiculo_matricula)
            setCabecTrip('777')
            //-----------------------------------------
            setUserId(aUserLogin.user_id);
            setUtilizador(aUserLogin.user_utilizador);
            setNome(aUserLogin.user_nome);
            setApelido(aUserLogin.user_apelido);
            setEmail(aUserLogin.user_email);
            setTelemovel(aUserLogin.user_telemovel);
            setCarId(aUserLogin.veiculo_id);
            setMatricula(aUserLogin.veiculo_matricula);
            //-----------------------------------------
            setLoading(false);

        } catch (err) {
            setLoading(false);
            console.log("Falha ao recuperar dados do utilizador logado ",err);
        }

    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fUpdatePerfil
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 15 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fUpdatePerfil(e) {
        e.preventDefault();

        // Valida preenchimento dos campos
        let lValidOk = fValidaCampos();
        if (!lValidOk) {
            return;
        }

        // Carrega variável que será utilizada na chamada da API
        const data = {
            nome,
            apelido,
            email,
            telemovel
        };

        // Chama API
        try {
            setLoading(true);
            const resp = await api.put('users/'+user_id,data);
            setLoading(false);

            Alert.alert('Ok','Dados atualizados com sucesso!');
        } catch (err) {
            setLoading(false);
            console.log(err);
            Alert.alert('Erro','Perfil não atualizado, tente novamente.');
        }
    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fValidaCampos
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 20 de outubro de 2021, 10h00
    //|Descricao.: Valida preenchimento dos campos
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function fValidaCampos() {

        let lValidOk = true;       

        if (lValidOk && !nome) {
            Alert.alert('Campo: nome','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !apelido) {
            Alert.alert('Campo: apelido','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !email) {
            Alert.alert('Campo: e-mail','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !telemovel) {
            Alert.alert('Campo: telemovel','Favor preencher todos os campos!');
            lValidOk = false;
        };
       
        return lValidOk;
    }

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
                    <Text style={styles.UserEditProcess}>Processando...</Text>
                </View>
            )}

            {/*----------------------------------------------------
            # Construção do ecrã após processamento da API
            ----------------------------------------------------*/}
            {!loading && (
                <View style={styles.container}>

                    <Cabec 
                        name="UserEdit"
                        utilizador={cabec_user}
                        matricula ={cabec_car }
                        qtd_trips ={cabec_trip}
                    />
                    {/*<Titulo>Perfil</Titulo>*/}
                    <Menu />
                    <View style={styles.contorno}>
                        <Text style={styles.userTitTopo}>EDITAR PERFIL:</Text>
                        <ScrollView showsVerticalScrollIndicator={true}>

                            <View style={styles.user}>

                                <View style={styles.grupo_campos}>
                                    <Text style={styles.campo_label}>UTILIZADOR</Text>
                                    <TextInput 
                                        style={styles.campo_text_blq}
                                        placeholder="Utilizador"
                                        placeholderTextColor="#777"
                                        keyboardType="name-phone-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={utilizador}
                                        onChangeText={setUtilizador}
                                        editable={false}
                                    />
                                </View>

                                <View style={styles.grupo_campos}>
                                    <Text style={styles.campo_label}>NOME</Text>
                                    <TextInput 
                                        style={styles.campo_text}
                                        placeholder="Nome"
                                        placeholderTextColor="#999"
                                        keyboardType="name-phone-pad"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        value={nome}
                                        onChangeText={setNome}
                                    />
                                </View>

                                <View style={styles.grupo_campos}>
                                    <Text style={styles.campo_label}>APELIDO</Text>
                                    <TextInput 
                                        style={styles.campo_text}
                                        placeholder="Apelido"
                                        placeholderTextColor="#999"
                                        keyboardType="name-phone-pad"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        value={apelido}
                                        onChangeText={setApelido}
                                    />
                                </View>

                                <View style={styles.grupo_campos}>
                                    <Text style={styles.campo_label}>E-MAIL</Text>
                                    <TextInput 
                                        style={styles.campo_text}
                                        placeholder="E-mail"
                                        placeholderTextColor="#999"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>

                                <View style={styles.grupo_campos}>
                                    <Text style={styles.campo_label}>TELEMÓVEL</Text>
                                    <TextInput 
                                        style={styles.campo_text}
                                        placeholder="Telemóvel"
                                        placeholderTextColor="#999"
                                        keyboardType="phone-pad"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        value={telemovel}
                                        onChangeText={setTelemovel}
                                    />
                                </View>

                                <View style={styles.grupo_campos}>
                                    <Text style={styles.campo_label}>VEÍCULO</Text>
                                    <TextInput 
                                        style={styles.campo_text_blq}
                                        placeholder="Veículo"
                                        placeholderTextColor="#999"
                                        keyboardType="default"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        value={matricula}
                                        onChangeText={setMatricula}
                                        editable={false}
                                    />
                                </View>

                            </View>

                            <View style={styles.grupo_botao}>
{/*
                                <TouchableOpacity
                                    onPress={()=>{navigation.goBack()}}
                                    style={styles.botao}
                                    activeOpacity={0.8}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="arrow-left-circle" size={20} color="#F3470E" style={styles.botao_icon}></Feather>
                                        <Text style={styles.botao_text}>  VOLTAR    </Text>
                                    </View>
                                </TouchableOpacity>
*/}
                                <TouchableOpacity
                                    onPress={fUpdatePerfil}
                                    style={styles.botao}
                                    activeOpacity={0.8}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Feather name="save" size={20} color="#003139" style={styles.botao_icon}></Feather>
                                        <Text style={styles.botao_text}>  GUARDAR    </Text>
                                    </View>
                                </TouchableOpacity>
                                
                            </View>

                            <View style={styles.espaco}></View>

                        </ScrollView>
                    </View>
                </View>
            )}

        </ImageBackground>

    );
}