/**
 * 所有API
 * @module service/api
 * @author keren
 */

import wepy from 'wepy'
import request from './request.js'

// login 获取 token值
export const getLogin = async options => await request('GET', '/v1/user/login', options)