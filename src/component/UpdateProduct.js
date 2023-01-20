import React, { useState, useEffect } from 'react';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PORT = 'https://mernbackend-gzhr.onrender.com';





export default function UpdateProduct() {

   const [productName, setProductName] = useState('');
   const [productPrice, setProductPrice] = useState('');
   const [productCategory, setProductCategory] = useState('');
   const [productCompany, setProductCompany] = useState('');
   const [productData, setProductData] = useState([]);
   const [error, setError] = useState(false);
   const navigate = useNavigate();
   const params = useParams();


   useEffect(() => {
      getProductDetails()
   }, [])

   const getProductDetails = async () => {
      let data = axios.get(`${PORT}/one-product/${params.id}`);
      let user = await data;
      setProductData(user.data.data);
      setProductName(user.data.data.name);
      setProductPrice(user.data.data.price);
      setProductCategory(user.data.data.category);
      setProductCompany(user.data.data.company);
   }


   const submitProductUpdate = async () => {

      if (!productName || !productPrice || !productCategory || !productCompany) {
         setError(true)
      }
      else {
         let productData = await fetch(`${PORT}/update/${params.id}`, {
            method: "PUT",
            body: JSON.stringify({ name: productName, price: productPrice, category: productCategory, company: productCompany }),
            headers: {
               "content-type": "application/json"
            }
         })

         productData = await productData.json();
         console.log(productData);
         navigate('/list-products')
      }
   }

   return (
      <div>

         <>
            <Form>
               <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter product Name" onChange={(e) => {
                     setProductName(e.target.value)
                  }} value={productName} />

                  {error && !productName && <span style={{ color: 'red' }}>Enter valid name</span>}
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Product Price</Form.Label>
                  <Form.Control type="text" placeholder="Enter Product Price" onChange={(e) => {
                     setProductPrice(e.target.value)
                  }} value={productPrice} />
                  {error && !productPrice && <span style={{ color: 'red' }}>Enter valid price</span>}
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>Product Category</Form.Label>
                  <Form.Control type="text" placeholder="Enter Product Category" onChange={(e) => {
                     setProductCategory(e.target.value)
                  }}
                     value={productCategory}
                  />
                  {error && !productCategory && <span style={{ color: 'red' }}>Enter valid product</span>}
               </Form.Group>
               <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Label>Product Company</Form.Label>
                  <Form.Control type="text" placeholder="Enter Product Company" onChange={(e) => {
                     setProductCompany(e.target.value)
                  }}
                     value={productCompany}

                  />
                  {error && !productCompany && <span style={{ color: 'red' }}>Enter valid company</span>}
               </Form.Group>
               <Button variant="primary" onClick={() => { submitProductUpdate() }} >
                  Submit
               </Button>
            </Form>
         </>
      </div>
   )
}
