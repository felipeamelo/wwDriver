import React                             from 'react';
import { View, Text, TouchableOpacity  } from 'react-native';
import { Feather                       } from '@expo/vector-icons';
import { useNavigation                 } from '@react-navigation/native';
import AsyncStorage                      from '@react-native-async-storage/async-storage';
import styles                            from './styles';

function Titulo(props) {
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

        <View style={styles.titulo}>
            <Text style={styles.texto}>{props.children}</Text>
            <TouchableOpacity
                onPress={Logof}
                style={styles.botao}
                activeOpacity={0.8}>
                <Feather name="power" size={20} color="#F3470E"></Feather>
            </TouchableOpacity>
        </View>

    );

}

export default Titulo;