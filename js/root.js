import React from 'react';
import {Provider} from 'mobx-react';

import RootRoutes from './routes';
import stores from './store';

const Root = () => (
    <Provider {...stores}>
        <RootRoutes/>
    </Provider>
);

export default Root;
