import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';

import RootRoutes from './routes'
import reducers from './reducer';

const store = createStore(
    reducers, 
    fromJS({}), applyMiddleware(thunk)
);

const Root = () => (
    <Provider store={store}>
        <RootRoutes/>
    </Provider>
);

export default Root;
