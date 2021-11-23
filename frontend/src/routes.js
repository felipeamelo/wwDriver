import React    from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Logon    from './pages/Logon';

import User     from './pages/User';
import UserEdit from './pages/UserEdit';
import UserPass from './pages/UserPass';

import Car      from './pages/Car';
import CarEdit  from './pages/CarEdit';

import Trip     from './pages/Trip';
import TripEdit from './pages/TripEdit';

import Profile  from './pages/Profile';

function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/"             exact component={Logon}    />
                <Route path="/user"         exact component={User}     />
                <Route path="/user/edit"    exact component={UserEdit} />
                <Route path="/user/key"     exact component={UserPass} />

                <Route path="/car"          exact component={Car}      />
                <Route path="/car/edit"     exact component={CarEdit}  />

                <Route path="/trip"         exact component={Trip}     />
                <Route path="/trip/edit"    exact component={TripEdit} />

                <Route path="/profile"            component={Profile}  />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;