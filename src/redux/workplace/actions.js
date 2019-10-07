import {
    CHANGED_EXCEL_SIZE,
    ADD_EXCEL_SHEET,
    REMOVE_EXCEL_SHEET,
    CHANGE_EXCEL_SHEET_NAME,
    CHANGE_EXCEL_SHEET_SELECTED,
    DOWNLOAD_EXCEL
} from './action-types';


export const changedExcelSize = (params) => ({ type: CHANGED_EXCEL_SIZE, data: params });

export const addExcelSheet = (params) => ({ type: ADD_EXCEL_SHEET, data: params });

export const removeExcelSheet = (params) => ({ type: REMOVE_EXCEL_SHEET, data: params });

export const changeExcelSheetName = (params) => ({ type: CHANGE_EXCEL_SHEET_NAME, data: params });

export const changeExcelSheetSelected = (params) => ({ type: CHANGE_EXCEL_SHEET_SELECTED, data: params });

export const downloadExcel = (params) => ({ type: DOWNLOAD_EXCEL, data: params });