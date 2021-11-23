import { StyleSheet } from 'react-native';
import Contants from 'expo-constants';

export default StyleSheet.create({

    header: {
        height: '9%'
    },
    menu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E84919',
        paddingBottom: 1,
        paddingLeft: 10,
        paddingRight: 5,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    
    menuText: {
        marginBottom: 5,
        marginTop: 5,
        fontSize:11,
        color: '#fff',
    },

    grupoBotao: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

});