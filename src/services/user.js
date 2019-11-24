import { stringify } from 'qs';
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/user/auth');
}

export async function queryCurrentMenu() {
  return request('/user/auth/menu');
}


export async function forgetPassWord(params) {
  return request('/user/auth/password', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function userApply(params) {
  return request('/user/company', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function compayInfo() {
  return request('/user/company');
}

export async function companySetInfo(params) {
  return request('/user/company', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function sendSms(params) {
  return request('/user/sms', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function bindMobile(params) {
  return request('/user/user/mobile', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function resetPassWord(params) {
  return request('/user/user/password', {
    method: 'PUT',
    body: {
      ...params,
    },
  });
}

export async function companyConfig(params) {
  return request(`/user/company/config?${stringify(params)}`);
}

export async function companySetConfig(params) {
  return request(`/user/company/config?field_name=${params.field_name}`, {
    method: 'PUT',
    body: {
      ...params.fields,
    },
  });
}
