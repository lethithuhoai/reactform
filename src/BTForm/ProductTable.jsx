import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../baiTapForm/slice'

const ProductTable = () => {
    const { productList } = useSelector((state) => state.baiTapForm)
    const dispatch = useDispatch()

    return (
        <div className='mt-5'>
            <table className='table'>
                <thead className='table-dark'>
                    <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList?.map((prd) => {

                            return (
                                <tr key={prd?.payload?.id}>
                                    <td>{prd?.payload?.id}</td>
                                    <td>{prd?.payload?.name}</td>
                                    <td>{prd?.payload?.phonenumber}</td>
                                    <td>{prd?.payload?.email}</td>
                                    <td className='d-flex gap-3'>
                                        <button className='btn btn-success' onClick={() => {
                                            dispatch(baiTapFormActions.editProduct(prd))
                                        }}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => {
                                            dispatch(baiTapFormActions.deleteProduct(prd?.payload?.id))
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div >
    )
}

export default ProductTable