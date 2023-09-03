import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { baiTapFormActions } from '../baiTapForm/slice'

const ProductForm = () => {
    const [formValue, setFormValue] = useState({})
    const [formError, setFormError] = useState({})
    const { productEdit } = useSelector((state) => state.baiTapForm)

    const dispatch = useDispatch()

    const validate = (element) => {
        const { validity, minLength, title } = element
        const { valueMissing, tooShort, patternMismatch } = validity

        let mess = ''
        if (valueMissing) {
            mess = 'Vui lòng nhập'
        } else if (tooShort) {
            mess = `Vui lòng nhập tối thiểu ${minLength} ký tự`
        } else if (patternMismatch) {
            mess = `Vui lòng nhập đúng ${title}`
        }

        return mess
    }

    // currying function
    const handleFormValue = () => (ev) => {
        const { name, value } = ev.target
        let mess = validate(ev.target)

        setFormError({
            ...formError,
            [name]: mess,
        })

        setFormValue({
            ...formValue,
            [name]: value,
        })
    }

    const handleSubmitFormStudent = (ev) => {
        // ngăn chặn sự kiện reload của browser khi submit form
        ev.preventDefault()
        const elements = document.querySelectorAll('input')
        let errors = {}

        elements.forEach(ele => {
            const { name } = ele
            let mess = validate(ele)
            errors[name] = mess
        })
        setFormError(errors)

        let isFlag = false
        for (let key in errors) {

            if (errors[key]) {
                isFlag = true
                break
            }
        } 
        if (isFlag) return
        if (!productEdit) {
            //submit create product
            dispatch(baiTapFormActions.addProduct(formValue))
        } else {
            let obj = {}
            elements.forEach(e => {
                obj[e.name] = e.value
            })
            dispatch(baiTapFormActions.updateProduct(obj))
        }
    }

    return (
        <form noValidate onSubmit={(e) => handleSubmitFormStudent(e)}>
            <h3 className='p-4 bg-dark text-warning'>Thông tin sinh viên</h3>

            <div className="mt-3 row">
                <div className="col-6">
                    <p>Mã sinh viên</p>
                    <input type="text" className="form-control" name='id' title='mã sinh viên' disabled={!!productEdit}
                        value={formValue?.id}
                        required
                        minLength={5}
                        maxLength={20}
                        autoComplete='Off'
                        onChange={handleFormValue()}
                    />
                    {formError?.id && <p className='text-danger'>{formError?.id}</p>}
                </div>
                <div className="col-6">
                    <p>Họ tên</p>
                    <input type="text" className="form-control" name='name' title='họ và tên'
                        // value={formValue?.name || ""} 
                        value={formValue?.name}
                        onChange={handleFormValue()} required minLength={10}
                    />
                    {formError?.name && <p className='text-danger'>{formError?.name}</p>}
                </div>
                <div className="col-6">
                    <p>Số điện thoại</p>
                    <input type="number" className="form-control" name='phonenumber' title='số điện thoại' value={formValue?.phonenumber && formValue?.phonenumber*1} onChange={handleFormValue()} required pattern='^[0-9]+$' />
                    {formError?.phonenumber && <p className='text-danger'>{formError?.phonenumber}</p>}
                </div>
                <div className="col-6">
                    <p>Email</p>
                    <input type="text" className="form-control" name='email' title='email' value={formValue?.email} onChange={handleFormValue()} required pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" />
                    {formError?.email && <p className='text-danger'>{formError?.email}</p>}
                </div>
            </div>
            <div className='mt-3 d-flex gap-3'>
                {productEdit ? (
                    <button className='btn btn-info'>Cập nhật</button>
                ) : (
                    <button className='btn btn-success'>Thêm sinh viên</button>
                )}
            </div>
        </form>
    )
}

export default ProductForm