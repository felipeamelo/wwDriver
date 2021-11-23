import React, { useState, useEffect          } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { Feather                             } from '@expo/vector-icons';
import { useNavigation                       } from '@react-navigation/native';
import AsyncStorage                            from '@react-native-async-storage/async-storage';
import logoImg                                 from '../../assets/logo.png';
import styles                                  from './styles';

function Cabec(props) {
    const navigation = useNavigation();

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
    //|Data......: 16 de agosto de 2021, 10h00
    //|Descricao.: Construção do layout do App
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    return(

        <View style={styles.header}>
            <Image style={styles.logo} source={logoImg} />
            <View style={styles.subHeader}>
                <Text style={styles.bemvindo}>Bem-vindo!</Text>
                <View style={{height:15}}></View>
                <Text style={styles.description}>{props.utilizador}</Text>
                <Text style={styles.descriptionsub1}>{props.matricula}</Text>
                {/*<Text style={styles.descriptionsub2}>Viagens: {props.qtd_trips}</Text>*/}
                <View style={{height:15}}></View>
                <TouchableOpacity
                    onPress={Logof}
                    style={styles.botao}
                    activeOpacity={0.8}>
                    <Feather name="power" size={20} color="#F3470E"></Feather>
                </TouchableOpacity>
            </View>
        </View>

    );

}

export default Cabec;