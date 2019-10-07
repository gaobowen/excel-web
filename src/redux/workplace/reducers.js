import { CHANGED_EXCEL_SIZE, ADD_EXCEL_SHEET, REMOVE_EXCEL_SHEET, CHANGE_EXCEL_SHEET_NAME } from './action-types'

const initSize = { width: 0, height: 0 }

const excelSheet = (state = initSize, action) => {
    switch (action.type) {
        case CHANGED_EXCEL_SIZE:
            return {...action.data }
        default:
            return state;
    }
}

export default excelSheet;