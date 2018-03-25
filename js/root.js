import React from 'react';
import {Provider} from 'mobx-react';
import {MenuProvider} from 'react-native-popup-menu';

import RootRoutes from './routes';
import stores from './store';

const Root = () => (
    <Provider {...stores}>
        <MenuProvider>
            <RootRoutes/>
        </MenuProvider>
    </Provider>
);

export default Root;
