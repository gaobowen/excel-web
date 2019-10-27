import {
    CHANGED_EXCEL_SIZE,
    ADD_EXCEL_SHEET,
    REMOVE_EXCEL_SHEET,
    CHANGE_EXCEL_SHEET_NAME,
    CHANGE_EXCEL_SHEET_SELECTED,
    DOWNLOAD_EXCEL,
    HIT_TEST_OPERATE,
    GET_SELECTED_GRID,
    ADD_DRAG_IMAGE,
    SORT_MEDIA_ELEMENTS,
    COMMIT_UPDATE_GRIDDATAS
} from './action-types';


export const changedExcelSize = (params) => ({ type: CHANGED_EXCEL_SIZE, data: params });

export const addExcelSheet = (params) => ({ type: ADD_EXCEL_SHEET, data: params });

export const getSelectedGrid = (params) => ({ type: GET_SELECTED_GRID, data: params });

export const removeExcelSheet = (params) => ({ type: REMOVE_EXCEL_SHEET, data: params });

export const changeExcelSheetName = (params) => ({ type: CHANGE_EXCEL_SHEET_NAME, data: params });

export const changeExcelSheetSelected = (params) => ({ type: CHANGE_EXCEL_SHEET_SELECTED, data: params });

export const downloadExcel = (params) => ({ type: DOWNLOAD_EXCEL, data: params });

export const hitTestOperate = (params) => ({ type: HIT_TEST_OPERATE, data: params });

export const addDragImage = (params) => ({ type: ADD_DRAG_IMAGE, data: params });

export const sortMediaElements = (params) => ({ type: SORT_MEDIA_ELEMENTS, data: params });

export const commitUpdateGridDatas = (params) => ({ type: COMMIT_UPDATE_GRIDDATAS, data: params });