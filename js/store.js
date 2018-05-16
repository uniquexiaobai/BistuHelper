import homeStore from './pages/home/store';
import courseStore from './pages/course/store';
import discoveryStore from './pages/discovery/store';

export default {
    ...homeStore,
    ...courseStore,
    ...discoveryStore,
};
