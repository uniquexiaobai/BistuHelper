import DiscoveryStore from './pages/discovery/store';
import HomeStore from './pages/home/store';

export default {
    DiscoveryStore: new DiscoveryStore(),
    ...HomeStore,
};
