import { createSlice, current } from '@reduxjs/toolkit'

let initialState = {
    productList: [],
    searchList: [],
    productEdit: false
}

function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}

export const baiTapFormSlice = createSlice({
    name: 'baiTapForm',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.productList.push(action.payload)
            state.searchList.push(action.payload)
        },
        deleteProduct: (state, action) => {
            state.productList = state.productList.filter((prd) => prd.id !== action.payload)
            state.searchList = state.searchList.filter((prd) => prd.id !== action.payload)
        },
        editProduct: (state, { payload }) => {
            state.productEdit = payload
        },
        updateProduct: (state, action) => {
            state.productList = state.productList.map((prd) => {
                if (prd.id === action.payload.id) {
                    return action.payload
                }
                return prd
            })
            state.productEdit = null
        },
        searchStudent: (state, action) => {
            console.log("test", current(state.productList));
            console.log("searchList", current(state.searchList));
            if (action.payload === "") {
                state.productList = state.searchList
            } else {
                let newArrSearch = [];
                state.searchList.forEach((e) => {
                    const name = removeAccents(e?.name?.toUpperCase());

                    if (name?.match(action.payload?.toUpperCase())?.[0]) {
                        newArrSearch.push(e);
                    }
                });
                state.productList = newArrSearch
            }
        },
    },
})

export const { reducer: baiTapFormReducer, actions: baiTapFormActions } = baiTapFormSlice