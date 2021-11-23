import React                          from 'react';
import { NavigationContainer }        from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

import Logon     from './pages/Logon';

import Home      from './pages/Home';

import Trip      from './pages/Trip';
import TripEdit  from './pages/TripEdit';
import TripList  from './pages/TripList';

import UserEdit  from './pages/UserEdit';
import UserPass  from './pages/UserPass';

import Car       from './pages/Car';

export default function Routes() {
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>

                <AppStack.Screen name="Logon"    component={Logon}    />

                <AppStack.Screen name="Home"     component={Home}     />
                <AppStack.Screen name="TripEdit" component={TripEdit} />
                <AppStack.Screen name="TripList" component={TripList} />
                <AppStack.Screen name="Trip"     component={Trip}     />

                <AppStack.Screen name="UserEdit" component={UserEdit} />
                <AppStack.Screen name="UserPass" component={UserPass} />

                <AppStack.Screen name="Car"      component={Car}      />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
