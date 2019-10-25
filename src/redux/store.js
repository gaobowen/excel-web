import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import login from './login/reducers'
import excelSheet from './workplace/reducers'
import gridDatas from './workplace/reducers-grid-datas'
import  ctrlData  from './workplace/reducers-operate'

import { combineReducers } from 'redux'; //用于合并多个模块的reducers




export default createStore(
    combineReducers({ login, excelSheet, gridDatas, ctrlData }),
    applyMiddleware(thunk) // 应用异步中间件
)