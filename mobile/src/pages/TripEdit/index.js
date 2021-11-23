import React, { useState, useEffect                  }  from 'react';
import { View, Text, TextInput, ImageBackground, 
         ScrollView, Platform, CheckBox, Pressable,
         TouchableOpacity,                            
         Alert, ActivityIndicator                    }  from 'react-native';
import { useNavigation                               }  from '@react-navigation/native';
import { Feather                                     }  from '@expo/vector-icons';
import AsyncStorage                                     from '@react-native-async-storage/async-storage';
import DropDownPicker                                   from 'react-native-dropdown-picker';
import DateTimePicker                                   from '@react-native-community/datetimepicker';
import { TextInputMask }                                from 'react-native-masked-text'
import api                                              from '../../services/api';
import Moment                                           from "moment";

import styles                                           from './styles';
import imgBgd                                           from '../../assets/ww.png';
import Cabec                                            from '../../components/Cabec';
import Menu                                             from '../../components/Menu';

import LocalItem                                        from '../../components/aLocalItem';
import PeriodoItem                                      from '../../components/aPeriodoItem';
import Titulo                                           from '../../components/Titulo';

export default function Trip() {
    const navigation = useNavigation();
    const [loading          , setLoading          ] = useState(false);
    const [utilizador       , setUtilizador       ] = useState('');
    const [user_id          , setUserId           ] = useState('');
    const [user_utilizador  , setUserLogin        ] = useState('');
    const [car_id           , setCarId            ] = useState('');
    const [car_matricula    , setCarMatricula     ] = useState('');
    const dt                                        = new Date()
    const [date             , setDate             ] = useState(new Date(dt.getFullYear(),dt.getMonth(),dt.getDate(),0,15,0,0));
    const [mode             , setMode             ] = useState('date');
    const [show             , setShow             ] = useState(false);
    //-----------------------------------------
    const [cabec_user       , setCabecUser        ] = useState('');
    const [cabec_car        , setCabecCar         ] = useState('');
    const [cabec_trip       , setCabecTrip        ] = useState('');
    //-----------------------------------------
    const [local_origem     , setOrigem           ] = useState(null);
    const [local_destino    , setDestino          ] = useState(null);
    const [viagem_data      , setViagemData       ] = useState(Moment(dt).format('DD-MM-YYYY'));
    const [viagem_periodo   , setPeriodo          ] = useState(null);
    const [viagem_duracao   , setViagemTime       ] = useState('00:15');
    const [viagem_dist_km   , setValorKm          ] = useState(0);
    const [viagem_idavolta  , setViagemIdaVolta   ] = useState(false);
    const [vlr_viag_bruto   , setVlrViagemBruto   ] = useState(0);
    const [vlr_viag_liquid  , setVlrViagemLiquido ] = useState(0.0);
    const [comissao_ww_per  , setComissaoWwPer    ] = useState(10.0);
    const [comissao_ww_vlr  , setComissaoWwVlr    ] = useState();
    const [comissao_ww_ok   , setComissaoWwOk     ] = useState(false);
   //-----------------------------------------

    const [lOpenPer  , setOpenPer   ] = useState(false);
    const [aPeriodos , setAllPeriodo] = useState([]);

    const [lOpenOrig , setOpenOrig  ] = useState(false);
    const [lOpenDest , setOpenDest  ] = useState(false);
    const [aLocais   , setAllLocal  ] = useState([]);

    //Filtra objeto para identificar se botão lista foi clicado
    const aNavPar = navigation.getState().routes.filter(item => [item.key>="TripList-"]);

    useEffect(() => {
        console.log("Tela Editar Viagem")
        fTripCarregaDados()
    },[aNavPar[1].params.click]);

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fCarregaDados
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 15 de outubro de 2021, 10h00
    //|Descricao.: Carrega viagens do utilizador logado
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fTripCarregaDados() {
        setLoading(true);
        let aUserLogin = JSON.parse(await AsyncStorage.getItem('@wwUser'));
        setCabecUser(aUserLogin.user_nome + " " + aUserLogin.user_apelido)
        setCabecCar(aUserLogin.veiculo_matricula)
        setCabecTrip('777')

        setUtilizador(aUserLogin.user_nome);
        setUserId(aUserLogin.user_id);
        setUserLogin(aUserLogin.user_utilizador);

        setCarId(aUserLogin.veiculo_id);
        setCarMatricula(aUserLogin.veiculo_matricula);
        setLoading(false);

        //Carrega Periodos e Locais
        try {
            setLoading(true);
            const periodoOpcao = PeriodoItem().map((x) => { return { "value":x.parte, "label":x.parte } } );
            setAllPeriodo(periodoOpcao);
    
            const localOpcao = LocalItem().map((x) => { return { "value":x.nome, "label":x.nome } } )
            setAllLocal(localOpcao)
            setLoading(false);

        } catch (err) {
            console.log("Falha ao carregar periodos e locais",err);
            setLoading(false);
        }

        //Carrega dados da Viagem
        try {
            setLoading(true);
            let cTripEditId = await AsyncStorage.getItem('@wwTripEditId');
            const resp = await api.get('tripfind/'+cTripEditId);
            console.log(resp.data);

            setOrigem(resp.data.local_origem);
            setDestino(resp.data.local_destino);
            setViagemData(Moment(resp.data.viagem_data).format('DD-MM-YYYY'));
            setPeriodo(resp.data.viagem_periodo);
            setViagemTime(resp.data.viagem_duracao);
            setValorKm(resp.data.viagem_dist_km);
            setViagemIdaVolta(resp.data.viagem_idavolta);
            setVlrViagemBruto(resp.data.vlr_viag_bruto);
            setVlrViagemLiquido(resp.data.vlr_viag_liquid);
            setComissaoWwPer(resp.data.comissao_ww_per);
            setComissaoWwVlr(resp.data.comissao_ww_vlr);
            setComissaoWwOk(resp.data.comissao_ww_ok);

            setLoading(false);

        } catch (err) {
            console.log("Falha ao carregar dados a viagem",err);
            setLoading(false);
        }
        
    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fGravarViagem
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 15 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    async function fGravarViagem(e) {
        e.preventDefault();

        //-------------------------------------
        // Valida preenchimento dos campos
        //-------------------------------------
        let lValidOk = fValidaCampos();
        if (!lValidOk) {
            return;
        }

        let nDistanKm = parseFloat(viagem_dist_km);
        let nVlrBruto = parseFloat(vlr_viag_bruto);
        let nPerComis = (comissao_ww_per/100);
        let nVlrComis = (nVlrBruto*nPerComis);
        let nVlrLiqui = (nVlrBruto-nVlrComis);
        let cDataViag = viagem_data.split('-')[2]+'-'+viagem_data.split('-')[1]+'-'+viagem_data.split('-')[0]+'T00:00:00.000Z'

        nPerComis = parseFloat(nPerComis.toFixed(2));
        nVlrComis = parseFloat(nVlrComis.toFixed(2));
        nVlrLiqui = parseFloat(nVlrLiqui.toFixed(2));

        setComissaoWwVlr(nVlrComis);
        setVlrViagemLiquido(nVlrLiqui);

        const data = {
            user_id,
            user_utilizador,
            car_id,
            car_matricula,
            local_origem,
            local_destino,
            "viagem_data":cDataViag,
            viagem_periodo,
            viagem_duracao,
            "viagem_dist_km":nDistanKm,
            viagem_idavolta,
            "vlr_viag_bruto":nVlrBruto,
            vlr_viag_liquid,
            comissao_ww_per,
            comissao_ww_vlr,
            comissao_ww_ok
        };

        try {
            setLoading(true);
            const resp = await api.post('trips/',data);

            //Limpa campos após gravação
            //setUserId('');
            //setUserLogin('');
            //setCarId('');
            //setCarMatricula('');
            setViagemData(Moment(dt).format('DD-MM-YYYY'));
            setPeriodo(null);
            setViagemTime('00:15');
            setOrigem(null);
            setDestino(null);
            setValorKm(0);
            setViagemIdaVolta(false);
            setVlrViagemBruto(0);
            setVlrViagemLiquido(0.0);
            setComissaoWwVlr(0);
            setComissaoWwOk(false);

            //Tira barra de processamento
            setLoading(false);

            //Apresenta mensagem de conclusão
            Alert.alert('Ok','Viagem registada com sucesso!');

            //Navega para lista de viagens
            //navigation.navigate('TripList');

        } catch (err) {
            setLoading(false);
            console.log(err);
            Alert.alert('Erro','Registo não realizado, tente novamente.');
        }
    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: fValidaCampos
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 18 de outubro de 2021, 10h00
    //|Descricao.: Valida preenchimento dos campos
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function fValidaCampos() {

        let lValidOk = true;

        if (lValidOk && !car_id) {
            Alert.alert('Veículo','Seu perfil está sem veículo!\nFale com administrador da empresa.');
            lValidOk = false;
        };

        if (lValidOk && !car_matricula) {
            Alert.alert('Veículo','Seu perfil está sem veículo!\nFale com administrador da empresa.');
            lValidOk = false;
        };

        if (lValidOk && !viagem_data) {
            Alert.alert('Campo: data','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !viagem_periodo) {
            Alert.alert('Campo: período','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !viagem_duracao) {
            Alert.alert('Campo: duração','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !local_origem) {
            Alert.alert('Campo: origem','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !local_destino) {
            Alert.alert('Campo: destino','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && !viagem_dist_km) {
            Alert.alert('Campo: distância','Favor preencher todos os campos!');
            lValidOk = false;
        };

        if (lValidOk && parseFloat(viagem_dist_km) == 0) {
            Alert.alert('Campo: distância','Distância tem que ser maior que zero!');
            lValidOk = false;
        };

        if (lValidOk && !vlr_viag_bruto) {
            Alert.alert('Campo: viagem','Favor preencher todos os campos!');
            lValidOk = false;
        };
        
        if (lValidOk && parseFloat(vlr_viag_bruto) == 0) {
            Alert.alert('Campo: viagem','Valor da viagem tem que ser maior que zero!');
            lValidOk = false;
        };
       
        return lValidOk;
    }

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: onChangeDateTime
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 18 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    const onChangeDateTime = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);


        //Atualiza variáveis que serão apresentadas para o utilizador
        setViagemData(Moment(currentDate).format('DD-MM-YYYY'));
        setViagemTime(StrZero(currentDate.getHours(),2) + ':' + currentDate.getMinutes());
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: showMode
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 18 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: showDatepicker
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 18 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    const showDatepicker = () => {
        showMode('date');
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: showTimepicker
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 18 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    const showTimepicker = () => {
        showMode('time');
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: StrZero
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 18 de outubro de 2021, 10h00
    //|Descricao.: 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function StrZero(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
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
                        <Text style={styles.TripProcess}>Processando...</Text>
                    </View>
                )}

                {/*----------------------------------------------------
                # Construção do ecrã após processamento da API
                ----------------------------------------------------*/}
                {!loading && (
                    <View style={styles.container}>

                        <Cabec 
                            name="Trip" 
                            utilizador={cabec_user} 
                            matricula ={cabec_car } 
                            qtd_trips ={cabec_trip} 
                        />
                        {/*<Titulo>Incluir Viagem</Titulo>*/}
                        <Menu />

                        <View style={styles.contorno}>
                            <Text style={styles.tripTitTopo}>DETALHES DA VIAGEM:</Text>

                            <ScrollView 
                                showsVerticalScrollIndicator={true}
                            >

                            {/*
                            <View style={{height: 5}}></View>
                            <View><Button onPress={showDatepicker} title="Show date" /></View>
                            
                            <View style={{height: 5}}></View>
                            <View><Button onPress={showTimepicker} title="Show time" /></View>
                            */}
                            
                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDateTime}
                                minuteInterval={5}
                                />
                            )}

                            {loading && (
                                <ActivityIndicator

                                />
                            )}

                                <View style={styles.trip}>

                                    <View style={styles.grupo_campos}>
                                        <Text style={styles.campo_label}>DATA</Text>
                                        <Pressable style={styles.custom_date}>
                                            <TextInput 
                                                style={styles.campo_date}
                                                placeholder="DD/MM/YYYY"
                                                placeholderTextColor="#888"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                value={viagem_data}
                                                editable={false}
                                            />
                                            <Feather name="calendar" size={22} color="#444" style={styles.icon_date}></Feather>
                                        </Pressable>
                                    </View>

                                    <View style={styles.grupo_campos}>
                                        <Text style={styles.campo_label}>PERÍODO</Text>
                                        <DropDownPicker
                                            multiple={false}
                                            itemSeparator={false}
                                            listMode="MODAL"

                                            placeholder="Período"
                                            open={false}
                                            value={viagem_periodo}
                                            items={aPeriodos}
                                            setOpen={setOpenPer}
                                            setValue={setPeriodo}
                                            setItems={setAllPeriodo}

                                            style={styles.combobox}
                                            placeholderStyle={styles.comboholder}
                                            labelStyle={styles.combolabel}
                                            textStyle={styles.combotext}

                                            containerStyle={styles.combotamanho}
                                            modalContentContainerStyle={styles.combodrop}

                                            searchable={true}

                                            selectedItemLabelStyle={{color: '#F3470E'}}
                                            searchablePlaceholder="Pesquisar..."
                                            translation={{SEARCH_PLACEHOLDER: "Pesquisar..."}}
                                            searchTextInputStyle={{color: "#444"}}
                                            searchPlaceholderTextColor='#999'
                                        />
                                    </View>

                                    <View style={styles.grupo_campos}>
                                        <Text style={styles.campo_label}>DURAÇÃO</Text>
                                        <Pressable style={styles.custom_date}>
                                            <TextInput 
                                                style={styles.campo_date}
                                                placeholder="DD/MM/YYYY"
                                                placeholderTextColor="#888"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                value={viagem_duracao}
                                                editable={false}
                                            />
                                            <Feather name="clock" size={22} color="#444" style={styles.icon_date}></Feather>
                                        </Pressable>
                                    </View>

                                    <View style={styles.grupo_campos_loc}>
                                        <Text style={styles.campo_label}>ORIGEM</Text>
                                        <DropDownPicker
                                            multiple={false}
                                            itemSeparator={false}
                                            listMode="MODAL"

                                            placeholder="Origem"
                                            open={false}
                                            value={local_origem}
                                            items={aLocais}
                                            setOpen={setOpenOrig}
                                            setValue={setOrigem}
                                            setItems={setAllLocal}

                                            style={styles.combobox_loc}
                                            placeholderStyle={styles.comboholder}
                                            labelStyle={styles.combolabel}
                                            textStyle={styles.combotext}

                                            containerStyle={styles.combotamanho}
                                            modalContentContainerStyle={styles.combodrop}

                                            searchable={true}

                                            selectedItemLabelStyle={{color: '#F3470E'}}
                                            searchablePlaceholder="Pesquisar..."
                                            translation={{SEARCH_PLACEHOLDER: "Pesquisar..."}}
                                            searchTextInputStyle={{color: "#444"}}
                                            searchPlaceholderTextColor='#999'
                                        />
                                    </View>

                                    <View style={styles.grupo_campos_loc}>
                                        <Text style={styles.campo_label}>DESTINO</Text>
                                        <DropDownPicker
                                            multiple={false}
                                            itemSeparator={false}
                                            listMode="MODAL"

                                            placeholder="Destino"
                                            open={false}
                                            value={local_destino}
                                            items={aLocais}
                                            setOpen={setOpenDest}
                                            setValue={setDestino}
                                            setItems={setAllLocal}

                                            //resetValue={false}
                                            //underlineColorAndroid="transparent"
                                            //onTextChange={(text) => console.log(text.toLowerCase())}
                                            //onItemSelect={(item) => alert(JSON.stringify(item))}

                                            style={styles.combobox_loc}
                                            placeholderStyle={styles.comboholder}
                                            labelStyle={styles.combolabel}
                                            textStyle={styles.combotext}

                                            containerStyle={styles.combotamanho}
                                            modalContentContainerStyle={styles.combodrop}

                                            searchable={true}

                                            selectedItemLabelStyle={{color: '#F3470E'}}
                                            searchablePlaceholder="Pesquisar..."
                                            translation={{SEARCH_PLACEHOLDER: "Pesquisar..."}}
                                            searchTextInputStyle={{color: "#444"}}
                                            searchPlaceholderTextColor='#999'
                                        />
                                    </View>

                                    <View style={styles.grupo_campos}>
                                        <Text style={styles.campo_label}>DISTÂNCIA</Text>
                                        <View style={styles.custom_date}>
                                            <TextInputMask
                                                editable={false}
                                                style={styles.campo_text}
                                                PlaceholderTextColor='#999'
                                                placeholder="Distância Km"
                                                type={'only-numbers'}
                                                options={{
                                                    precision: 2,
                                                    separator: ',',
                                                    delimiter: '.',
                                                    unit: 'Km ',
                                                    suffixUnit: ''
                                                }}
                                                value={viagem_dist_km}
                                                onChangeText={setValorKm}
                                            />
                                            <Text style={styles.icon_text}>Km</Text>
                                        </View>

                                    </View>

                                    <View style={styles.grupo_campos}>
                                        <Text style={styles.campo_label}>VIAGEM</Text>
                                        <View style={styles.custom_date}>
                                            <TextInputMask
                                                editable={false}
                                                style={styles.campo_text}
                                                PlaceholderTextColor='#999'
                                                placeholder="Viagem €"
                                                type={'money'}
                                                options={{
                                                    precision: 2,
                                                    separator: ',',
                                                    delimiter: ' ',
                                                    unit: '',
                                                }}
                                                value={vlr_viag_bruto}
                                                onChangeText={setVlrViagemBruto}
                                            />
                                            <Text style={styles.icon_text}>€</Text>
                                        </View>

                                    </View>

                                    <View style={styles.grupo_campos}>
                                        <CheckBox 
                                            value={viagem_idavolta}
                                        />
                                        <Text style={styles.campo_checkbox}>Viagem de ida e volta</Text>
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
                                        onPress={()=>{navigation.goBack()}}
                                        style={styles.botao}
                                        activeOpacity={0.8}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Feather name="arrow-left-circle" size={20} color="#003139" style={styles.botao_icon}></Feather>
                                            <Text style={styles.botao_text}>  VOLTAR    </Text>
                                        </View>
                                    </TouchableOpacity>

                                    {/*
                                    <TouchableOpacity
                                        onPress={fGravarViagem}
                                        style={styles.botao}
                                        activeOpacity={0.8}>
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Feather name="save" size={20} color="#003139" style={styles.botao_icon}></Feather>
                                            <Text style={styles.botao_text}>  GUARDAR    </Text>
                                        </View>
                                    </TouchableOpacity>
                                    */}
                                </View>

                                <View style={styles.espaco}></View>

                            </ScrollView>

                        </View>
                    </View>
                )}

        </ImageBackground>

    );
}