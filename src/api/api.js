import axios from 'axios';
import { get, post } from './http'
let base = '';
let baseUrl = 'http://api.50wlkj.com'
export const requestLogin = p => post(`${baseUrl}/api/user_login`, p);
//export const requestLogin = params => { return axios.post(`${baseUrl}/api/user_login`, params).then(res => res.data); };

//export const PostAddInitiator = params => { return axios.post(`${baseUrl}/api/add_initiator`, params).then(res => res.data); };

// export const GetListInitiator = params => { console.log(`${baseUrl}/api/list_category`);console.log(params); return axios.get(`${baseUrl}/api/list_initiator`, { params: params }); };

// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

// export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

// export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

// export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

// export const requestLogin=(paramObj)=>{return $server.post('/api.php?ac=v2_djList',paramObj)}