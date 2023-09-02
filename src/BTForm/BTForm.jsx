import React from 'react'
import ProductForm from './ProductForm'
import ProductTable from './ProductTable'
// thiếu import, ko biết sao ko import đc 
const BTForm = () => {
    return (
        <div>
            <h1>BTForm</h1>
            <ProductForm />
            <ProductTable />
        </div>
    )
}

export default BTForm