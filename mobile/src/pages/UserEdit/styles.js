import { StyleSheet } from 'react-native';
import Contants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Contants.statusBarHeight + 20,
        backgroundColor: "transparent"
    },
    
    title: {
        fontSize: 30,
        marginTop: 0,
        marginBottom: 5,
        color: '#F3470E',
        fontWeight: 'bold'
    },

    imageBgd: {
        flex: 1,
        padding: 0,
        margin: 0,
    },

    espaco: {
        height: 20
    },

    contorno: {
        marginTop: 0,
        paddingBottom: 20,
        borderWidth: 1,
        borderRightWidth: 5,
        borderBottomWidth: 5,
        borderRadius: 20,
        borderColor: '#003139',
        backgroundColor: '#fff',
        height: '65%'
    },

    userTitTopo: {
        marginTop: 5,
        fontSize: 14,
        color: '#003139',
        marginLeft: 14,
    },

    user: {
        marginTop: 5,
        padding: 12,
        borderRadius:8,
        backgroundColor: '#FFF',
    },

    grupo_campos: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:40,
    },

    campo_label: {
        borderWidth:0,
        paddingLeft: 7,
        fontSize: 14,
        color: '#444',
        height: '90%',
        width: '35%',
        textAlign: 'left',
        textAlignVertical: 'center',
        backgroundColor: '#003138df',
        color: '#fff',
        borderRadius: 4,
    },

    campo_text: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#444',
        height: '90%',
        width: '63%',
        borderRadius: 4,
    },

    campo_text_blq: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#777',
        backgroundColor: '#ddd' ,
        height: '90%',
        width: '63%',
        borderRadius: 4,
    },
    
    grupo_botao: {
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    botao: {
        paddingTop: 7,
        paddingBottom: 7,
        width: '50%',
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: "#E84919",
    },

    botao_text: {
        fontSize: 14,
        color: '#fff',
    },

    UserEditProcess: {
        fontSize:15,
        color: '#737380',
    },

});