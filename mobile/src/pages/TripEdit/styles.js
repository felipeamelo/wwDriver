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

    tripTitTopo: {
        marginTop: 5,
        fontSize: 14,
        color: '#003139',
        marginLeft: 14,
    },

    trip: {
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

    campo_data: {
        color: '#444',
        width: '66%',
    },

    campo_label: {
        borderWidth:0,
        paddingLeft: 7,
        fontSize: 14,
        color: '#444',
        height: '90%',
        width: '32%',
        textAlign: 'left',
        textAlignVertical: 'center',
        backgroundColor: '#003138df',
        color: '#fff',
        borderRadius: 4,
    },

    campo_text: {
        borderWidth: 0,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        fontSize: 14,
        color: '#444',
        height: '100%',
        width: '70%',
        borderRadius: 4,
    },

    icon_text: {
        borderWidth: 0,
        height:35,
        width: '30%',
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'right',
        paddingRight: 15,
        fontSize: 16,
        color: '#F3470E',
    },

    campo_checkbox: {
        borderWidth: 0,
        fontSize: 14,
        color: '#444',
        textAlign: 'left',
        width: '90%',
    },

    custom_date: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 14,
        color: '#444',
        height: 35,
        width: '66%',
        borderRadius: 4,
        backgroundColor: '#ddd'
    },

    campo_date: {
        fontSize: 14,
        color: '#777',
        paddingHorizontal: 10,
        width: '75%',
        borderRadius: 4,
        backgroundColor: '#ddd'
    },

    icon_date: {
        borderWidth: 0,
        height:35,
        width: '25%',
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'right',
        paddingRight: 10,
    },

    combotamanho: {
        width: '66%',
    },

    combobox: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        borderRadius: 4,
        height: 35,
        backgroundColor: '#ddd'
    },

    comboholder: {
        color:'#888', 
        fontSize:14,
    },

    combolabel: {
        color:'#777', 
        fontSize:14,
    },

    combotext: {
        color:'#444', 
        fontSize:14,
    },

    combodrop: {
        backgroundColor: '#fff',
    },
    
    grupo_campos_loc: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:55,
    },

    combobox_loc: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        borderRadius: 4,
        height: 50,
        backgroundColor: '#ddd'
    },

    grupo_botao: {
        marginTop: 5,
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

    TripProcess: {
        fontSize:15,
        color: '#737380',
    },

});