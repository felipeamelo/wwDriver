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

contorno: {
    marginTop: 0,
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

tripsList: {
    marginTop: 3,
    marginBottom: 5,
    backgroundColor: "transparent",
},

tripItem: {
    padding: 14,
    borderRadius: 8,
    backgroundColor: "transparent",
    marginBottom: 0,
    borderRadius: 20,
},

tripSub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
},

tripTit: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DDD',
    paddingTop: 1,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 5,
    marginTop: 0,
    borderRadius: 4,
},


triplblTit: {
    fontSize: 14,
    color: '#003139',
    fontWeight: 'bold',
},


tripDest: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
},

tripLabel: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
},

tripValue: {
    fontSize:15,
    color: '#737380',
},

tripProcess: {
    fontSize:15,
    color: '#737380',
},

btnTripDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
},

btnTripDetailText: {
    color: '#F3470E',
    fontSize: 15,
    fontWeight: 'normal',
},


});