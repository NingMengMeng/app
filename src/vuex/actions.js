import {
  getTodoList
} from '../api/api';

import api from '../api/api';

export const goLogin = ({commit}, params) => {
  return api.goToLogin(params).then(data => {
    return Promise.resolve(data)
  })
}

export const getAddressDuty = ({commit}) => {
  return api.queryAddress().then(data => {
    return Promise.resolve(data)
  })
}

export const getDeployDuty = ({commit}) => {
  return api.queryDeploy().then(data => {
    return Promise.resolve(data)
  })
}


export const getTodo = ({
  commit
}) => {
  return new Promise((resolve) => {
    getTodoList().then(res => {
      commit('EDITTODE', res.data.todos);
      resolve();
    });
  });
};

export const updateMenu = ({
  commit
}) => {
  commit('MENUOPEN');
};
