import { StyleSheet } from 'react-native';
import Contants from 'expo-constants';

export default StyleSheet.create({

    titulo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    texto: {
        fontSize: 30,
        marginTop: 0,
        marginBottom: 5,
        color: '#F3470E',
        fontWeight: 'bold',
        textAlignVertical: 'center',
    },

    botao: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 7,
        paddingVertical: 7,
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

});