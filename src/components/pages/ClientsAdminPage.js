import axios from '../../axios';
import React, { useEffect, useState } from 'react'
import Loading from '../Loading';
import { Container, Table } from 'react-bootstrap';
import Pagination from '../Pagination';

function ClientsAdminPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
        setLoading(true);
        axios.get('http://localhost:8000/users')
        .then(({data}) => {
          console.log(data)
            setLoading(false);
            setUsers(data);
        }).catch((e) => {
            setLoading(false);
            console.log(e)
        })
    }, [])

    if(loading) return <Loading/>

    if(users?.length === 0) return <h2 className="py-2 text-center">Client not yet</h2>

    function TableRow({_id, name, email}){
        return (
                <tr>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    
                </tr>
        )
    }
  return (
    <Container>
        <h1 className="text-center">Your orders</h1>
        <Table responsive striped bordered hover>
            <thead>
                <tr>
                    <th>Client ID</th>
                    <th>Client Name</th>
                    <th>Client Email</th>
                </tr>
            </thead>
            <tbody>
                {/* {users.map((user) => (
                    <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        
                    </tr>
                ))} */}
                <Pagination data={users} RenderComponent={TableRow} pageLimit={1} dataLimit={1} tablePagination={true} />
            </tbody>
        </Table>
    </Container>
  )
}

export default ClientsAdminPage