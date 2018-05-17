import qs from 'qs';
import axios from 'axios';

import {apiBaseUrl as baseUrl} from '../constants/url';

const newsHotUrl = `${baseUrl}/api/news/hot`;
const libraryBaseUrl = `${baseUrl}/api/library/base`;
const libraryBorrowUrl = `${baseUrl}/api/library/borrow`;
const educationBaseUrl = `${baseUrl}/api/education/base`;
const cetQueryUrl = `${baseUrl}/api/education/cet`;
const scoreQueryUrl = `${baseUrl}/api/education/score`;
const courseListUrl = `${baseUrl}/api/education/course`;

const defaultOptions = {
    method: 'POST',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
};

const postCreater = (url) => async (body) => {
    const options = defaultOptions;
    options.url = url;
    options.data = qs.stringify(body);

    try {
        const {data = {}} = await axios(options);

        if (data.code === 1) throw new Error(data.message);

        return data.data;
    } catch (err) {
        throw err;
    }
};

const getCreater = (url) => async () => {
    try {
        const {data = {}} = await axios.get(url);

        if (data.code === 1) throw new Error(data.message);

        return data.data;
    } catch (err) {
        throw err;
    }
};

export const fetchCourseList = postCreater(courseListUrl);

export const fetchLibraryBase = postCreater(libraryBaseUrl);

export const fetchLibraryBorrow = postCreater(libraryBorrowUrl);

export const fetchEducationBase = postCreater(educationBaseUrl);

export const fetchEducationCet = postCreater(cetQueryUrl);

export const fetchEducationScore = postCreater(scoreQueryUrl);

export const fetchNewsHot = getCreater(newsHotUrl);

export const fetchNewsList = async({type = 'zhxw', page = 1}) => {
    const url = `${baseUrl}/api/news?type=${type}&page=${page}`;

    try {
        const data = await getCreater(url)();
        return data;
    } catch (err) {
        throw err;
    }
}

export const fetchNewsDetail = async (newsId) => {
    const url = `${baseUrl}/api/news/${newsId}`;

    try {
        const data = await getCreater(url)();
        return data;
    } catch (err) {
        throw err;
    }
};
