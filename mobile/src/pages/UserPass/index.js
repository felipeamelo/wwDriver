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

export default function UserPass() {
    const navigation = useNavigation();
    const [loading     , setLoading    ] = useState(false);
    //-----------------------------------------
    const [user_id     , setUserId     ] = useState('');
    const [utilizador  , setUtilizador ] = useState('');
    const [novasenha1  , setNovaSenha1 ] = useState('');
    const [novasenha2  , setNovaSenha2 ] = useState('');
    //-----------------------------------------
    const [cabec_user  , setCabecUser  ] = useState('');
    const [cabec_car   , setCabecCar   ] = useState('');
    const [cabec_trip  , setCabecTrip  ] = useState('');

    //Filtra objeto para identificar se botão lista foi clicado
    const aNavPar = navigation.getState().routes.filter(item => [item.key>="UserPass-"]);

    useEffect(() => {
        console.log("Tela Senha")
        fUserPassDados()
    },[aNavPar[1].params.click]);


    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fUserCarregaDados
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 15 de outubro de 2021, 10h00
    //|Descricao.: Carrega viagens do utilizador logado
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fUserPassDados() {
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
            //-----------------------------------------
            setLoading(false);

        } catch (err) {
            setLoading(false);
            console.log("Falha ao recuperar dados do utilizador logado\n",err);
        }

    }

//+-----------------------------------------------------------------------------------//
    //|Funcao....: fUpdateSenha
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 20 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fUpdateSenha(e) {
        e.preventDefault();

        // Valida preenchimento dos campos
        let lValidOk = fValidaCampos();
        if (!lValidOk) {
            return;
        }

        // Carrega variável que será utilizada na chamada da API
        const data = {
            "password":novasenha1
        };

        // Chama API
        try {
            setLoading(true);

            //Chama api com dados da atualização
            const resp = await api.put('userpass/'+user_id,data);

            //Limpa campos após gravação
            setNovaSenha1('');
            setNovaSenha2('');

            setLoading(false);

            Alert.alert('Ok','Palavra-passe atualizada com sucesso!');
        } catch (err) {
            setLoading(false);
            console.log(err);
            Alert.alert('Erro','Palavra-passe não atualizada, tente novamente.');
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

        if (lValidOk && !novasenha1) {
            Alert.alert('Nova palavra-passe','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !novasenha2) {
            Alert.alert('Confirme nova palavra-passe','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && novasenha1 != novasenha2) {
            Alert.alert('Erro','Palavras-passe digitadas não conferem!');
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
                        <Text style={styles.UserPassProcess}>Processando...</Text>
                    </View>
                )}

                {/*----------------------------------------------------
                # Construção do ecrã após processamento da API
                ----------------------------------------------------*/}
                {!loading && (
                    <View style={styles.container}>

                        <Cabec 
                            name="UserPass"
                            utilizador={cabec_user}
                            matricula ={cabec_car }
                            qtd_trips ={cabec_trip}
                        />
                        {/*<Titulo>Senha</Titulo>*/}
                        <Menu />

                        <View style={styles.contorno}>
                            <Text style={styles.userTitTopo}>EDITAR PALAVRA-PASSE:</Text>

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
                                        <TextInput 
                                            secureTextEntry={true}
                                            style={styles.campo_text_one}
                                            placeholder="Nova palavra-passe"
                                            placeholderTextColor="#999"
                                            value={novasenha1}
                                            onChangeText={setNovaSenha1}
                                        />
                                    </View>

                                    <View style={styles.grupo_campos}>
                                        <TextInput 
                                            secureTextEntry={true}
                                            style={styles.campo_text_one}
                                            placeholder="Confirme nova palavra-passe"
                                            placeholderTextColor="#999"
                                            value={novasenha2}
                                            onChangeText={setNovaSenha2}
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
                                        onPress={fUpdateSenha}
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