import {AppRegistry} from 'react-native';
import {YellowBox} from 'react-native';
import CodePush from 'react-native-code-push';

import Root from './js/root';

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Warning: componentWillUpdate is deprecated',
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader',
    'Class RCTCxxModule',
]);

const App = CodePush(Root);

AppRegistry.registerComponent('BistuHelper', () => App);
