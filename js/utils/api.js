import qs from 'qs';
import axios from 'axios';

const baseUrl = 'http://bistuhelper.cn';

export const fetchBorrowInfo = async(params) => {
    try {
        const url = `${baseUrl}/api/library/borrow`;
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(params),
            url,
        };
        const response = await axios(options);

        if (response.status !== 200) return;

        return response.data;
    } catch (e) {
        throw(e);
    }
};

export const fetchNewsList = async () => {
    try {
        const requestURL = `${baseUrl}/api/news?type=zhxw&page=1`;
        const response = await axios.get(requestURL);

        if (response.status !== 200) return;

        return response.data;
    } catch (e) {
        throw(e);
    }
};
