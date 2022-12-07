import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useDeleteProductMutation } from '../../services/appApi';
import Pagination from '../Pagination';
import './DashboardProduct.css'

function DashboardProducts() {
    const products = useSelector(state => state.products);
    const user = useSelector(state => state.user)
    const [deleteProduct, {isLoading, isSuccess}] = useDeleteProductMutation()

    // removing yhe product
    function handleDeleteProduct(id){
        // logic
        if(window.confirm("Are you sure?")) deleteProduct({product_id: id, user_id: user._id})
    }

    function TableRow({pictures, _id, name, price}){
        return (
                <tr>
                    <td>
                        <img src={pictures[0].url} className="dashboard-product-preview" alt="img-product"/>
                    </td>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{price}</td>
                    <td>
                        <Button onClick={()=> handleDeleteProduct(_id, user._id)} disabled={isLoading}>Delete</Button>
                        <Link to={`/product/${_id}/edit`} className="btn btn-warning">Edit</Link>
                    </td>

                </tr>
        )
    }
  return (
    <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th></th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Product Price</th>
            </tr>
        </thead>
        <tbody>
            <Pagination data={products} RenderComponent={TableRow} pageLimit={1} dataLimit={1} tablePagination={true} />
        </tbody>
    </Table>
  )
}

export default DashboardProducts