import React from 'react';
import {Provider} from 'mobx-react';
import {MenuProvider} from 'react-native-popup-menu';

import RootRoutes from './routes';
import stores from './store';

const withMenuProvider = (Component) => (
    <MenuProvider>
        <Component/>
    </MenuProvider>
);

const Root = () => (
    <Provider {...stores}>
        {withMenuProvider(RootRoutes)}
    </Provider>
);

export default Root;
