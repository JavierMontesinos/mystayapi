import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const BASE = "http://192.168.1.139:8443"

const headerBuilder = async (headers) => {
    let token = await getToken();
    return {
        ...headers, "Authorization": `Bearer ${token}`
    }
}

const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
}

export const get = async (path, headers) => {
    headers = await headerBuilder(headers);
    return await axios.get(`${BASE}/${path}`, {headers});
}

export const post = async (path, body,headers,) => {
    headers = await headerBuilder(headers);
    return await axios.post(`${BASE}/${path}`, body, {headers});
}

export const put = async (path, body, headers) => {
    headers = await headerBuilder(headers);
    return await axios.put(`${BASE}/${path}`, body, {headers});
}