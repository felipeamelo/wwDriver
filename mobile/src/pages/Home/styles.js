import { StyleSheet } from 'react-native';
import Contants from 'expo-constants';

export default StyleSheet.create({

    container: {
        //flex: 1,
        marginTop: '25%',
        marginBottom: 0,
        marginLeft: '15%',
        marginRight: '15%',
        paddingHorizontal: 24,
        paddingTop: 5,
        paddingBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: 'center',
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

    home: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#ccc'
    },

    homeLogo: {
        height: '40%',
        width: '85%',
        //backgroundColor: '#ccc'
    },

    bemvindo: {
        fontSize:30,
        lineHeight: 30,
        color: '#E84919',
    },

    description: {
        fontSize:18,
        lineHeight: 25,
        color: '#003139',
    },
    

    grupo_botao: {
        marginTop: 5,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    botao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 7,
        paddingBottom: 7,
        width: '100%',
        height: 35,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: "#003139",
    },

    botao_text: {
        paddingLeft: 10,
        fontSize: 14,
        color: '#fff',
    },

    botao_icon: {
        paddingEnd: 10,
    },

    linha01: {
        height:'5%',
    },

    linha02: {
        height:'1%',
    },

    botao_logof: {
        //borderWidth: 1,
        //borderColor: '#ddd',
        //borderBottomWidth: 4,
        borderRadius: 25,
        paddingHorizontal: 7,
        paddingVertical: 7,
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 50,
        height: 50,
        //position: 'absolute',
    },

    botao_posicao: {
        marginTop: -30,
        marginBottom: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#ccc',
    },
    
});