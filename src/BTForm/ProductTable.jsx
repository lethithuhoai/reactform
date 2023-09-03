import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../baiTapForm/slice'

const ProductTable = () => {
    const { productList } = useSelector((state) => state.baiTapForm)
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState()

    useEffect(() => {
        if (searchValue) {
            dispatch(baiTapFormActions.searchStudent(searchValue))
        }
        if (searchValue === "") {
            dispatch(baiTapFormActions.searchStudent(searchValue))
        }
    }, [searchValue])

    const handleSearch = (value) => {
        setSearchValue(value)
    }
    return (
        <div className='mt-5'>

            <input placeholder='Nhập tên sinh viên để tìm kiếm' style={{ width: "1200px", marginBottom: "10px" }} onChange={(e) => handleSearch(e.target.value)} />
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
                                <tr key={prd?.id}>
                                    <td>{prd?.id}</td>
                                    <td>{prd?.name}</td>
                                    <td>{prd?.phonenumber}</td>
                                    <td>{prd?.email}</td>
                                    <td className='d-flex gap-3'>
                                        <button className='btn btn-success' onClick={() => {
                                            dispatch(baiTapFormActions.editProduct(true))
                                        }}>Edit</button>
                                        <button className='btn btn-danger' onClick={() => {
                                            dispatch(baiTapFormActions.deleteProduct(prd?.id))
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