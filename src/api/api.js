import axios from 'axios';
import { get, post } from './http'
let base = '';
let baseUrl = 'http://api.50wlkj.com'
// 登录
export const requestLogin = p => post(`${baseUrl}/api/user_login`, p); //通
// 公益项目
export const delProject = p => post(`${baseUrl}/api/del_project`, p);  //通
export const getProjects = p => post(`${baseUrl}/api/get_projects`, p);  //通
export const getProject = p => post(`${baseUrl}/api/get_project`, p);  //通
export const addProject = p => post(`${baseUrl}/api/add_project`, p);  //通，未加验证
export const updateProject = p => post(`${baseUrl}/api/update_project`, p);  // 报400，少公益项目id字段
// 公益机构
export const listOrg = p => post(`${baseUrl}/api/list_org`, p);  //通
export const addOrg = p => post(`${baseUrl}/api/add_org`, p);   //通
export const updateOrg = p => post(`${baseUrl}/api/update_org`, p); //  报400
export const deletOrg = p => post(`${baseUrl}/api/delete_org`, p);  //通
export const getOrg = p => post(`${baseUrl}/api/get_org`, p);  //通
// 发起人·
export const listInitiator = p => post(`${baseUrl}/api/list_initiator`, p);  //通
export const addInitiator = p => post(`${baseUrl}/api/add_initiator`, p);  //上传图片未添加
export const deleteInitiator = p => post(`${baseUrl}/api/delete_initiator`, p);  //通
export const updateInitiator = p => post(`${baseUrl}/api/update_initiator`, p);//报400
export const getInitiator = p => post(`${baseUrl}/api/get_initiator`, p);//通
//善款接收方
export const listRecipients = p => post(`${baseUrl}/api/list_recipients`, p);  //通
export const addRecipients = p => post(`${baseUrl}/api/add_recipients`, p);  // 接口通，上传图片未添加
export const deleteRecipients = p => post(`${baseUrl}/api/delete_recipients`, p);  //
export const updateRecipients = p => post(`${baseUrl}/api/update_recipients`, p);// 报400
export const getRecipients = p => post(`${baseUrl}/api/get_recipients`, p);//通
//项目负责人
export const listLeader = p => post(`${baseUrl}/api/list_leader`, p);  //通
export const addLeader = p => post(`${baseUrl}/api/add_leader`, p);  // 接口通，上传图片未添加
export const deleteLeader = p => post(`${baseUrl}/api/delete_leader`, p);  //通
export const updateLeader = p => post(`${baseUrl}/api/update_leader`, p);// 报400
export const getLeader = p => post(`${baseUrl}/api/get_leader`, p);//通
//分类
export const listCategory= p => post(`${baseUrl}/api/list_category`, p);  //通 
export const addCategory = p => post(`${baseUrl}/api/add_category`, p);  // 接口通，上传图片未添加
export const deleteCategory = p => post(`${baseUrl}/api/delete_category`, p);  //通
export const updateCategory = p => post(`${baseUrl}/api/update_category`, p);// 报400
//banner
export const getBanners = p => post(`${baseUrl}/api/get_banners`, p);  //通
export const addBanner = p => post(`${baseUrl}/api/add_banner`, p);  // 通
export const delBanner = p => post(`${baseUrl}/api/del_banner`, p);  //通
export const updateBanner = p => post(`${baseUrl}/api/update_banner`, p);// 通
//h5
export const listH5= p => post(`${baseUrl}/api/list_h5`, p);  //通 
// export const addCategory = p => post(`${baseUrl}/api/add_category`, p);  // 接口通，上传图片未添加
// export const deleteCategory = p => post(`${baseUrl}/api/delete_category`, p);  //通
// export const updateCategory = p => post(`${baseUrl}/api/update_category`, p);// 报400
//关键字
export const getKeywords= p => post(`${baseUrl}/api/get_keywords`, p);  //通 
export const delKeyword= p => post(`${baseUrl}/api/del_keyword`, p);  //通 
export const addKeyword= p => post(`${baseUrl}/api/add_keyword`, p);  //通 
export const updateKeyword= p => post(`${baseUrl}/api/update_keyword`, p);  //通 


// 上传图片
export const upload_img = p => post(`${baseUrl}/api/upload_img`, p);//通



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
