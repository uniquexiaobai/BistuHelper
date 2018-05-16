import {AppRegistry} from 'react-native';
import {YellowBox} from 'react-native';

import Root from './js/root';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: isMounted(...) is deprecated',
]);

AppRegistry.registerComponent('BistuHelper', () => Root);
