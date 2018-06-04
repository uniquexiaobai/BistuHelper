import homeStore from './pages/home/store';
import courseStore from './pages/course/store';
import discoveryStore from './pages/discovery/store';
import meStore from './pages/me/store';

export default {
    ...homeStore,
    ...courseStore,
    ...discoveryStore,
    ...meStore,
};
