import axios from 'axios';
import { Toast, Loading} from 'ELUI/dialog';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.defaults.baseURL = '/aodiapi';

axios.defaults.timeout = 10000; //前端设置超时，一旦超过10s就表示没有返回

axios.interceptors.request.use(config => {
  Loading.open('努力加载中...');
  return config;
}, error => {
  Loading.close();
  return Promise.reject(error)
});

export const fetchPost = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(ret => {
      Loading.close();
      if(ret.data.status === 1000) {
        Toast({mes: 'success', timeout: 2000})
        return resolve(ret.data);
      }else{
        Toast({mes: ret.data.desc, timeout: 2000})
      }
    }).catch((error) => {
      Loading.close();
      Toast({mes: 'error', timeout: 2000})
      return reject(error)
    })
  })
};

export default {
  goToLogin: params => {
    console.log('api go to')
    return fetchPost(`/user/login`, params);
  },
  //系统排班表
  queryAddress: () => {
    return fetchPost(`contacts/queryAddressBook`);
  },
  //部署组数据
  queryDeploy: () => {
    return fetchPost(`contacts/queryDeploySchedule`);
  }
}

export const requestLogin = params => {
  return axios.post(`/login`, params).then(res => res.data);
};

export const getTodoList = params => {
  return axios.get(`/todo/list`, {
    params: params
  });
};

export const getTodo = params => {
  return axios.get(`/todo/listId`, {
    params: params
  });
};

export const addRecord = params => {
  return axios.post(`/todo/addRecord`, params).then(res => res.data);
};

export const editTodo = params => {
  return axios.post(`/todo/editTodo`, params).then(res => res.data);
};
export const editRecord = params => {
  return axios.post(`/todo/editRecord`, params).then(res => res.data);
};

export const addTodo = params => {
  return axios.post(`/todo/addTodo`, params).then(res => res.data);
};

// export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

// export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
