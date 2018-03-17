const fetchNewsList = () => {
    return (dispatch) => {
        return fetch('http://bistuhelper.cn/api/news?type=zhxw&page=1')
            .then(response => response.json())
            .then((data) => {
                dispatch({type: 'fetch-news-list', payload: data});
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    };
};

const fetchNewsDetail = (newsId) => {
    return (dispatch) => {
        return fetch(`http://bistuhelper.cn/api/news/${newsId}`)
            .then(response => response.json())
            .then((data) => {
                dispatch({type: 'fetch-news-detail', payload: data});
                return Promise.resolve();
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }
}

export default {
    fetchNewsList,
    fetchNewsDetail,
};
