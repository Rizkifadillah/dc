import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Loading from '../Loading'
import { Badge, Button, Container, Modal, Table } from 'react-bootstrap';
import Pagination from '../Pagination';

function OrdersAdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const products = useSelector(state => state.products);
  const [orderToShow, setOrderToShow] = useState([]);
  const [ show, setShow]= useState(false);
  const handleClose = () => setShow(false)

  function markShipped(orderId, ownerId){
    axios.patch(`http://localhost:8000/orders/${orderId}/mark-shipped`, {ownerId})
    .then(({data})=> setOrders(data))
    .catch((e) => console.log(e))
  }

  function showOrder(productsObj){
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = {...product};
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    // console.log(products)
    setShow(true);
    setOrderToShow(productsToShow)
  }

  useEffect(()=>{
    setLoading(true);
    axios.get('http://localhost:8000/orders')
    .then(({data})=>{
      setLoading(false);
      setOrders(data);
    }).catch((e)=> {
      setLoading(false)
    })
  },[]);

  if(loading){
    return (
      <Loading />
    )
  }

  if(orders.length === 0){
    return (
      <h2 className='text-center pt-4'>No Orders</h2>
    )
  }

  function TableRow({ _id, count, owner, total, status, products, address }) {
        return (
            <tr>
                <td>{_id}</td>
                <td>{owner?.name}</td>
                <td>{count}</td>
                <td>{total}</td>
                <td>{address}</td>
                <td>
                    {status === "processing" ? (
                        <Button size="sm" onClick={() => markShipped(_id, owner?._id)}>
                            Mark as shipped
                        </Button>
                    ) : (
                        <Badge bg="success">Shipped</Badge>
                    )}
                </td>
                <td>
                    <span style={{ cursor: "pointer" }} onClick={() => showOrder(products)}>
                        View order <i className="fa fa-eye"></i>
                    </span>
                </td>
            </tr>
        );
    }

  return (
    <Container>
        <h1 className="text-center">Your orders</h1>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Client Name</th>
                    <th>Items</th>
                    <th>Order Total</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                <Pagination data={orders} RenderComponent={TableRow} pageLimit={1} dataLimit={2} tablePagination={true} />
            </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Order details</Modal.Title>
            </Modal.Header>
            {orderToShow.map(order => (
              <div className="order-details__container d-flex justify-content-around py-2">
                <img src={order.pictures[0].url} style={{maxWidth: 100, height: 100, objectFit: "cover"}}/>
                <p>
                  <span>{order.count} x </span> {order.name}
                </p>
                <p>
                  Price: ${Number(order.price) * order.count}
                </p>
              </div>
            ))}
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </Container>
  )
}

export default OrdersAdminPage