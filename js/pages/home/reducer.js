import {Map, fromJS} from 'immutable';

const home = (state = Map(), action) => {
    const {type, payload} = action;

    if (type === 'fetch-news-list') {
        return state.set('newsList', fromJS(payload));
    } else if (type === 'fetch-news-detail') {
        return state.set('newsDetail', fromJS(payload));
    }
    return state;
};

export default home;
