import axios from '../../axios'
import React, { useEffect } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import {Link} from 'react-router-dom'
import categories from '../../categories'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateProducts } from '../../features/productSlice'
import ProductPreview from '../ProductPreview'
import Pagination from '../Pagination'

function Home() {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const lastProducts = products.slice(0,8)
    useEffect(() => {
        axios.get("http://localhost:8000/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

    function LastProduct({ _id, category, name, pictures }) {
        return <ProductPreview _id={_id} category={category} name={name} pictures={pictures} />;
    }

  return (
    <div>
            <img src=" https://res.cloudinary.com/learn-code-10/image/upload/v1653947013/yqajnhqf7usk56zkwqi5.png" className="home-banner" alt="banner" />
            <div className="featured-products-container container mt-4">
                <h2>Last Products</h2>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap">
                    {/* {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))} */}
                    {lastProducts.length === 0 ? (
                        <h1>No products to show</h1>
                    ) : (
                        <Container>
                            <Row>
                                <Col md={{ span: 10, offset: 1 }}>
                                    <Pagination data={lastProducts} RenderComponent={LastProduct} pageLimit={1} dataLimit={2} tablePagination={false} />
                                </Col>
                            </Row>
                        </Container>
                    )}
                </div>
                <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        See more {">>"}
                    </Link>
                </div>
            </div>
            {/* sale banner */}
            <div className="sale__banner--container mt-4">
                <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" alt="img" />
            </div>
            <div className="recent-products-container container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
  )
}

export default Home