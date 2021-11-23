import   React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation                } from '@react-navigation/native';
import { Feather                      } from '@expo/vector-icons';
import styles                           from './styles';

function Menu(props) {
    const navigation = useNavigation();

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: navigateTripEdit
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 17 de agosto de 2021, 10h00
    //|Descricao.: Botão Detalhes da Viagem
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function navigateTripList() {
        //Filtra obeto
        let aTemp = navigation.getState().routes.filter(item => [item.key>="TripList-"]);
        let nContaClick = 0;

        //Verifica se parametro está preenchido e utiliza caso esteja
        if (typeof(aTemp[1].params)=="object") {
            nContaClick = aTemp[1].params.click;
            nContaClick ++
        }

        //Navega para página enviando o parametro click
        navigation.navigate('TripList',{click: nContaClick});
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: navigateTripEdit
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 18 de agosto de 2021, 10h00
    //|Descricao.: Botão Editar Viagem
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function navigateTrip() {
        //Filtra obeto
        let aTemp = navigation.getState().routes.filter(item => [item.key>="Trip-"]);
        let nContaClick = 0;

        //Verifica se parametro está preenchido e utiliza caso esteja
        if (typeof(aTemp[1].params)=="object") {
            nContaClick = aTemp[1].params.click;
            nContaClick ++
        }

        //Navega para página enviando o parametro click
        navigation.navigate('Trip',{click: nContaClick})
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: navigateUserEdit
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 17 de agosto de 2021, 10h00
    //|Descricao.: Botão Editar Utilizador 
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function navigateUserEdit() {
        //Filtra obeto
        let aTemp = navigation.getState().routes.filter(item => [item.key>="UserEdit-"]);
        let nContaClick = 0;

        //Verifica se parametro está preenchido e utiliza caso esteja
        if (typeof(aTemp[1].params)=="object") {
            nContaClick = aTemp[1].params.click;
            nContaClick ++
        }

        //Navega para página enviando o parametro click
        navigation.navigate('UserEdit',{click: nContaClick})
    };

    //+-----------------------------------------------------------------------------------//
    //|Funcao....: navigateUserPass
    //|Autor.....: Felipe Aurélio de Melo - felipeamelo@gmail.com
    //|Data......: 17 de agosto de 2021, 10h00
    //|Descricao.: Botão Alterar Palavra-Passe
    //|Observação: 
    //+-----------------------------------------------------------------------------------//
    function navigateUserPass() {
        //Filtra obeto
        let aTemp = navigation.getState().routes.filter(item => [item.key>="UserPass-"]);
        let nContaClick = 0;

        //Verifica se parametro está preenchido e utiliza caso esteja
        if (typeof(aTemp[1].params)=="object") {
            nContaClick = aTemp[1].params.click;
            nContaClick ++
        }

        //Navega para página enviando o parametro click
        navigation.navigate('UserPass',{click: nContaClick})
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
            <View style={styles.menu}>
                <TouchableOpacity
                    onPress={navigateTrip}
                    style={styles.grupoBotao}>
                    <Feather name="edit-2" size={17} color="#003139"></Feather>
                    <Text style={styles.menuText  }> REGISTAR{"\n"} VIAGEM</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={navigateTripList}
                    style={styles.grupoBotao}>
                    <Feather name="search" size={17} color="#003139"></Feather>
                    <Text style={styles.menuText  }> REGISTO DE{"\n"} VIAGENS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={navigateUserEdit}
                    style={styles.grupoBotao}>
                    <Feather name="user" size={17} color="#003139"></Feather>
                    <Text style={styles.menuText  }> O MEU{"\n"} PERFIL</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={navigateUserPass}
                    style={styles.grupoBotao}>
                    <Feather name="unlock" size={17} color="#003139"></Feather>
                    <Text style={styles.menuText  }> PALAVRA   {"\n"} PASSE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

}

export default Menu;