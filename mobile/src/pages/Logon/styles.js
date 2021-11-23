import { StyleSheet } from 'react-native';
import Contants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        //paddingHorizontal: 24,
        //paddingTop: Contants.statusBarHeight + 10,
    },

    logonImg: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    logonLogo: {
        height: '30%',
        width: '50%',
        //backgroundColor: '#737380'
    },

    logonPlaca: {
        height: 130,
        width: '100%',
        //backgroundColor: '#737380'
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        fontSize: 15,
        color: '#737380',
    },

    headerTextBold: {
        fontWeight: 'bold',
        color: '#737380',
    },

    title: {
        fontSize: 30,
        marginTop: 20,
        marginBottom: 5,
        color: '#003138',
        fontWeight: 'bold'
    },

    description: {
        fontSize:16,
        lineHeight: 24,
        color: '#003139',
    },

    descriptionsub: {
        fontSize:16,
        lineHeight: 24,
        color: '#F3470E',
        marginBottom: 10
    },

    form: {
        flex:1,
        justifyContent: 'center',
    },

    logon: {
        width: '70%',
        marginTop: '5%',
        padding: 10,
        borderRadius:8,
        backgroundColor: 'transparent',
    },

    logonLabel: {
        fontSize:16,
        color: '#fff',
        marginBottom: 8
    },

    logonInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 4,
        backgroundColor: '#FFF',
    },

    logonButton: {
        marginTop: 10,
        marginLeft: 40,
        marginEnd: 40,
        height: 42,
        backgroundColor: '#007385',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },

    logonButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 17
    },

    imageBgd: {
        flex: 1,
        padding: 0,
        margin: 0,
      },

    LogonProcess: {
        fontSize:15,
        color: '#fff',
    },

    linha01: {
        height:'3%',
    },

});