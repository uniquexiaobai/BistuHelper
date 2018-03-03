const fetchNewsList = () => {
  return (dispatch) => {
    return fetch('http://115.159.66.250:3000/v1/news?type=zhxw&page=1')
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: 'fetch-news-list', 
          payload: data.newsList,
        });
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};

export default {
  fetchNewsList,
};