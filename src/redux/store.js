import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import login from './login/reducers'
import excelSheet from './workplace/reducers'
import gridDatas from './workplace/reducers-grid-datas'

import { combineReducers } from 'redux'; //用于合并多个模块的reducers


//这里可以模仿eggjs直接把appconfig对象挂载到store上，供全局使用

export default createStore(
    combineReducers({ login, excelSheet, gridDatas }),
    applyMiddleware(thunk) // 应用上异步中间件
)