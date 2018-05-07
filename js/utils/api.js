import qs from 'qs';
import axios from 'axios';

const baseUrl = 'http://bistuhelper.cn';
// baseUrl = 'http://53d3a9bd.ngrok.io';

export const fetchBorrowInfo = async(body) => {
    try {
        const url = `${baseUrl}/api/library/borrow`;
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(body),
            url,
        };
        const response = await axios(options);

        if (response.status !== 200) return;

        return response.data;
    } catch (e) {
        throw(e);
    }
};

export const fetchNewsList = async ({type='zhxw', page=1}) => {
    try {
        const requestURL = `${baseUrl}/api/news?type=${type}&page=${page}`;
        const response = await axios.get(requestURL);

        if (response.status !== 200) return;

        return response.data;
    } catch (e) {
        throw(e);
    }
};

export const fetchNewsDetail = async (newsId) => {
    try {
        const requestURL = `${baseUrl}/api/news/${newsId}`;
        const response = await axios.get(requestURL);

        if (response.status !== 200) return;

        return response.data;
    } catch (e) {
        throw(e);
    }
};
