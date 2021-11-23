import { StyleSheet } from 'react-native';
import Contants from 'expo-constants';

export default StyleSheet.create({
    
    logo: {
        width: 150,
        height: 150,
    },
    
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%'
    },

    subHeader: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },

    description: {
        fontSize:16,
        lineHeight: 24,
        color: '#003139',
    },
    
    descriptionsub1: {
        fontSize:16,
        lineHeight: 24,
        color: '#003139',
    },
    
    descriptionsub2: {
        fontSize:14,
        lineHeight: 24,
        color: '#737380',
    },

    bemvindo: {
        fontSize:20,
        lineHeight: 24,
        color: '#E84919',
    },

    botao: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 4,
        borderRadius: 15,
        paddingHorizontal: 7,
        paddingVertical: 7,
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 40,
    },

});