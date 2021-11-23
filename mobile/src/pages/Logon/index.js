import React, { useState, useEffect                  }  from 'react';
import { useNavigation }                                from '@react-navigation/native';
import AsyncStorage                                     from '@react-native-async-storage/async-storage';
import { View, KeyboardAvoidingView, Platform, 
         Image, ImageBackground, TouchableOpacity,
         Text, TextInput, Alert, ActivityIndicator   }  from 'react-native';
import api                                              from '../../services/api';
import logoImg                                          from '../../assets/logo_branco.png';
import imgBgd                                           from '../../assets/login_fundo.png';
import placaTVDE                                        from '../../assets/login_frase.png';
import styles                                           from './styles';

export default function Logon() {
    //Inicializando variáveis
    const navigation = useNavigation();
    const [loading   , setLoading   ] = useState(false);
//-----------------------------------------
    const [utilizador, setUtilizador] = useState('');
    const [password  , setPassword  ] = useState('');

    //Filtra objeto para identificar se botão lista foi clicado
    const aNavPar = navigation.getState().routes.filter(item => [item.key>="Logon-"]);

    useEffect(() => {
        console.log("Tela de login")
        fValidaAcesso();
    }, [aNavPar.params]);
    
    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fValidaAcesso
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 07 de setembro de 2021, 10h00
    //|Descricao.: Valida Registo do Utilizador
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fValidaAcesso() {
        let cUserLogin = await AsyncStorage.getItem('@wwUser');

        if (cUserLogin) {
            fRecarregaDados(cUserLogin)
            console.log("Utilizador já estava registado");

        } else {
            console.log("Precisa registar o utilizador");
        }
    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fLogin
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 16 de agosto de 2021, 10h00
    //|Descricao.: Botão Entrar
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fLogin() {
        const data = {
            utilizador,
            password
        };

        //Chama api e valida utilizador e palavra-passe
        try {
            setLoading(true);
            //Chama API passando usuário e senha e espera retorno posito
            const resp = await api.post('verify',data);
            
            //Pega dados do retorno e salva no array
            const userLogin = fDadosUser(resp.data.user);
            
            //salva dados do array na variável locaL
            await AsyncStorage.setItem('@wwUser',JSON.stringify(userLogin));           

            setUtilizador('');
            setPassword('');
            navigation.navigate('Home',{click: 0});
            console.log("Login realizado com sucesso!");
            setLoading(false);

        } catch (err) {
            console.log("Falha no login, tente novamente.\n",err);
            setLoading(false);
            Alert.alert('ERRO','Falha no login, tente novamente!');
        }

    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fRecarregaDados
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 19 de outubro de 2021, 10h00
    //|Descricao.: Recarrega dados do utilizador
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fRecarregaDados(cUserLogin) {
        try {
            setLoading(true);
            //Valida se utilizador ja estava logado e recarrega dados
            let oUser = JSON.parse(cUserLogin);

            //Limpa variável local
            await AsyncStorage.removeItem('@wwUser');

            //Chama API com o ID do utilizador
            const resp = await api.get('userfind/'+oUser.user_id);
            
            //Carrega Array com dados da API
            const userUpdate = fDadosUser(resp.data);
            
            //Recarrega variável local
            await AsyncStorage.setItem('@wwUser',JSON.stringify(userUpdate));
            
            setUtilizador('');
            setPassword('');
            setLoading(false);

            navigation.navigate('Home',{click: 0});

        } catch (err) {
            console.log("Falha no login, tente novamente.\n",err);
            setLoading(false);
            Alert.alert('ERRO','Falha no login, tente novamente!');
        }
    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fDadosUser
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 19 de outubro de 2021, 10h00
    //|Descricao.: Recarrega dados do utilizador
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function fDadosUser(oDados) {
        
        let oRetDados = { 
            user_id: oDados._id,
            user_nome: oDados.nome,
            user_apelido: oDados.apelido,
            user_utilizador: oDados.utilizador,
            user_email: oDados.email,
            user_telemovel: oDados.telemovel,
            veiculo_id: oDados.veiculo[0],
            veiculo_matricula: oDados.veiculo[1],
          }

        return oRetDados;
    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: LAYOUT
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 16 de agosto de 2021, 10h00
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
                        <Text style={styles.LogonProcess}>Processando...</Text>
                    </View>
                )}

                {/*----------------------------------------------------
                # Construção do ecrã após processamento da API
                ----------------------------------------------------*/}
                {!loading && (
                    <KeyboardAvoidingView behavior="padding" style={styles.container}>

                        <Image style={styles.logonLogo} source={logoImg} />
                        <View style={styles.linha01}></View>
                        <Image style={styles.logonPlaca} source={placaTVDE} />

                        <View style={styles.logon}>

                            <Text style={styles.logonLabel}>UTILIZADOR</Text>
                            <TextInput 
                                style={styles.logonInput}
                                placeholder="Utilizador"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={utilizador}
                                onChangeText={setUtilizador}
                            />

                            <Text style={styles.logonLabel}>PALAVRA-PASSE</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={styles.logonInput}
                                placeholder="Palavra-passe"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity 
                                style={styles.logonButton}
                                onPress={fLogin}
                                >
                                <Text style={styles.logonButtonText}>ENTRAR</Text>
                            </TouchableOpacity>

                        </View>

                    </KeyboardAvoidingView>
                )}

            </ImageBackground>
    );
}

