import React,{useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'

const Home = () => {
    const [products, setproducts] = useState([])

    useEffect(()=>{
        async function getProducts(){
            const {data} = await axios.get('/api/products/');
            setproducts(data);
        }

        getProducts();
    },[])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product.id} sm={12} md={6} lg={3}><Product product = {product}/></Col>
                ))}
            </Row>

        </div>
    )
}

export default Home