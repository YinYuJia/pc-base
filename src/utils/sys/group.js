import request from '@/utils/axios'
import axios from '@/utils/axios'
import loadash from 'lodash'
import {ParameterMatching} from "../util"
// 获取列表
export function groupList (params) {
  return axios.get("/apiUrl/sys/group/list",params)
  return request({
    url: request.adornUrl('/sys/group/list'),
    method: 'get',
    params: request.adornParams(params)
  })
}

export function groupAllList (params) {
  return request({
    url: request.adornUrl('/sys/group/allList'),
    method: 'get',
    params: request.adornParams(params)
  })
}

export function groupInfo (id) {
  // ParameterMatching
  return axios.get(ParameterMatching('/apiUrl/sys/group/info' + (loadash.isInteger(id) ? `/${id}` : ''),id))
}

export function groupData (params) {
  return request({
    url: request.adornUrl('/sys/group/groupData'),
    method: 'get',
    params: request.adornParams(params)
  })
}

// 添加部门
export function groupAdd (params) {
  return axios.post("/apiUrl/sys/group/save",params)
  return request({
    url: request.adornUrl('/sys/group/save'),
    method: 'post',
    data: request.adornData(params)
  })
}

// 部门修改
export function groupUpdate (params) {
  return axios.post("/apiUrl/sys/group/update",params)
  return request({
    url: request.adornUrl('/sys/group/update'),
    method: 'put',
    data: request.adornData(params)
  })
}

export function groupCheck (params) {
  return axios.get(ParameterMatching("/apiUrl/sys/group/groupCheck",params))
  return request({
    url: request.adornUrl('/sys/group/groupCheck'),
    method: 'get',
    params: request.adornParams(params)
  })
}

export function doGroupDetele(gCode){
  return request({
    url: request.adornUrl('/sys/group/doDetele' +  `/${gCode}`),
    method: 'get',
    params: request.adornParams(gCode)
  })
}

export function groupByCode (params) {
  return request({
    url: request.adornUrl('/sys/group/groupByCode'),
    method: 'get',
    params: request.adornParams(params)
  })
}

/*====================================================================================================================*/
export function groupChangeTree(data){
  var res = []
  var temp = {}
  let id = "gCode";
  let pid = "gpCode";
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
    data[i]['value'] = data[i].gCode;
    data[i]['label'] = data[i].gName;
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res;
}

export function groupTreeWithCode(data){
  var res = []
  var temp = {}
  let id = "gCode";
  let pid = "gpCode";
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
    data[i]['value'] = data[i].gCode;
    data[i]['label'] = data[i].gName;
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res;
}
