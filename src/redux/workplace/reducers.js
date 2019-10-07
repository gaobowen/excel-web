import { CHANGED_EXCEL_SIZE } from './action-types'

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