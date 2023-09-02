import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    productList: [],
    productList: undefined,
}

const baiTapFormSlice = createSlice({
    name: 'baiTapForm',
    initialState,
    reducers: {
        addProduct: (state, payload) => {
            state.productList.push(payload)
        },
        deleteProduct: (state, payload) => {
            state.productList = state.productList.filter((prd) => prd.id !== payload?.id)
        },
        editProduct: (state, { payload }) => {
            state.productEdit = payload
        },
        updateProduct: (state, { payload }) => {
            //c1:
            const index = state.productList.findIndex((prd) => prd.id === payload.id)
            state.productList[index] = payload
            //c2:
            state.productList = state.productList.map((prd) => {
                if (prd.id === payload.id) {
                    return payload
                }
                return prd
            })
            state.productEdit = undefined
        },
    },
})

export const { reducer: baiTapFormReducer, actions: baiTapFormActions } = baiTapFormSlice