import React, {useState} from 'react'
import { Col, Container, Form, Row, Alert, Button } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import axios from '../../axios'
import { useCreateProductMutation } from '../../services/appApi'
import './NewProduct.css'

function NewProduct() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [imgToRemove, setImgToRemove] = useState(null)
    const navigate = useNavigate()
    const [createProduct, {isError, error, isLoading, isSuccess}] = useCreateProductMutation()

    function handleNewProduct(e){
        e.preventDefault();
        if(!name || !description || !price || !category || !images.length){
            return alert("Please fill out all the fields")
        }
        createProduct({name, description, price, category, images}).then(({data}) => {
            if(data.length > 0){
                setTimeout(() => {
                    navigate("/")
                }, 1500)
            }
        })
    }

    function handleRemoveImg(imgObj){
        setImgToRemove(imgObj.public_id)
        axios
            .delete(`http://localhost:8000/images/${imgObj.public_id}`)
            .then((res) =>{
                setImgToRemove(null);
                setImages((prev) => prev.filter((img)=> img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e))
    }

    function showWidget(){
        const widget = window.cloudinary.openUploadWidget(
            {
                cloudName: "dwrgsiyn2",
                uploadPreset: "buvywazv",
            },
            (error, result) => {
                if(!error & result.event === "success"){
                    setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}]);
                }
            }
        );
        widget.open();
    }

  return (
    <Container>
        <Row >
            <Col md={6} className='new-product__form--container'>
                <Form style={{width: "100%"}} onSubmit={handleNewProduct}>
                    <h2 className="mt-4">Create a product</h2>
                    {isSuccess &&  <Alert variant="success">Product created success</Alert>}
                    {isError &&  <Alert variant="danger">{error.data}</Alert>}
                    <Form.Group>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter product name" value={name} required
                            onChange={(e) => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control style={{height: "100px"}} as="textarea" placeholder="Enter product description" value={description} required
                            onChange={(e) => setDescription(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter product price" value={price} required
                            onChange={(e) => setPrice(e.target.value)}/>
                    </Form.Group>
                    
                    <Form.Group className="mb-5" onChange={(e) => setCategory(e.target.value)}>
                        <Form.Label>Category</Form.Label>
                        <Form.Select>
                            <option disabled selected>--Select Category--</option>
                            <option value="technology">technology</option>
                            <option value="education">education</option>
                            <option value="sport">sport</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Button type="button" onClick={showWidget}>Upload Images</Button>
                        <div className='images-preview-container'>
                            {images.map((image) => (
                                <div  className='image-preview'>
                                    <img src={image.url} alt={image.public_id}/>
                                    {/* add icon for removing */}
                                    {imgToRemove !== image.public_id && 
                                        <i className='fa fa-times-circle' onClick={() => handleRemoveImg(image)}></i>
                                    }
                                </div>
                            ))}
                        </div>
                    </Form.Group>
                    
                    <Form.Group>
                        <Button type="submit" className="mb-2" disabled={isLoading || isSuccess}>Create Product</Button>
                    </Form.Group>
                </Form>  
            </Col>
            <Col md={6} className='new-product__image--container'></Col>
        </Row>
    </Container>
  )
}

export default NewProduct