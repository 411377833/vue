import axios from 'axios';
import { get, post } from './http'
let base = '';
let baseUrl = 'http://api.50wlkj.com'
// 登录
export const requestLogin = p => post(`${baseUrl}/api/user_login`, p); //通
export const updatePassword = p => post(`${baseUrl}/api/user_update_password`, p); //通

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
export const addH5= p => post(`${baseUrl}/api/add_h5`, p);  //通 
// export const addCategory = p => post(`${baseUrl}/api/add_category`, p);  // 接口通，上传图片未添加
// export const deleteCategory = p => post(`${baseUrl}/api/delete_category`, p);  //通
// export const updateCategory = p => post(`${baseUrl}/api/update_category`, p);// 报400
//关键字
export const getKeywords= p => post(`${baseUrl}/api/get_keywords`, p);  //通 
export const delKeyword= p => post(`${baseUrl}/api/del_keyword`, p);  //通 
export const addKeyword= p => post(`${baseUrl}/api/add_keyword`, p);  //通 
export const updateKeyword= p => post(`${baseUrl}/api/update_keyword`, p);  
//捐款
export const getDonations= p => post(`${baseUrl}/api/get_donations`, p);  //通 
export const delDonation= p => post(`${baseUrl}/api/del_donation`, p);  //通 
export const addDonation= p => post(`${baseUrl}/api/add_donation`, p);  //通 
export const getDonation= p => post(`${baseUrl}/api/get_donation`, p);  
// 建议反馈
export const listGy_suggest= p => post(`${baseUrl}/api/list_gy_suggest`, p);  //通 
// 为TA证实
export const getProves= p => post(`${baseUrl}/api/get_proves`, p);  //通 
export const delProve= p => post(`${baseUrl}/api/del_prove`, p);  //通 
export const updateProve= p => post(`${baseUrl}/api/update_prove`, p);  //通 
// export const getProves= p => post(`${baseUrl}/api/get_proves`, p);  //通 
// 公益咨询
export const getGyInfos= p => post(`${baseUrl}/api/get_gy_infos`, p);  //通 
export const delGyInfos= p => post(`${baseUrl}/api/del_gy_info`, p);  //通 

// 上传图片
export const upload_img = p => post(`${baseUrl}/api/upload_img`, p);//通


