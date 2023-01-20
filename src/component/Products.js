import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';

const PORT = 'https://mernbackend-gzhr.onrender.com';

export default function Products() {

   const [productName, setProductName] = useState('');
   const [productPrice, setProductPrice] = useState('');
   const [productCategory, setProductCategory] = useState('');
   const [productCompany, setProductCompany] = useState('');
   const navigate = useNavigate();
   const [error, setError] = useState(false);

   const auth = localStorage.getItem('user');
   let data = JSON.parse(auth);
   console.log(data.body._id)


   const submitProduct = async () => {

      if (!productName || !productPrice || !productCategory || !productCompany) {
         setError(true)
      }
      else {
         let productData = await fetch(`${PORT}/add-product`, {
            method: "POST",
            body: JSON.stringify({ name: productName, price: productPrice, category: productCategory, company: productCompany, userId: data.body._id }),
            headers: {
               "content-type": "application/json"
            }
         })

         productData = await productData.json();
         console.log(productData);
         if (productData.sucess) {
            alert('record successfully created');
            navigate('/list-products');

         }
         else {
            alert('something went wrong')
         }
      }
   }
   return (
      <div className=' mt-4'>
         <>
            <section className="over-y-hide">
               <div className="container">
                  <div className="row ">
                     <div className="col-sm-12 col-md-7 col-lg-5 mx-auto mt50">
                        <div className="card card-signin mb-3">
                           <div className="card-body" >

                              <div className="form-signin" >
                                 <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                       <Form.Label>Product Name</Form.Label>
                                       <Form.Control type="text" placeholder="Enter product Name" onChange={(e) => {
                                          setProductName(e.target.value)
                                       }} />
                                       {error && !productName && <span style={{ color: 'red' }}>Enter valid name</span>}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                       <Form.Label>Product Price</Form.Label>
                                       <Form.Control type="text" placeholder="Enter Product Price" onChange={(e) => {
                                          setProductPrice(e.target.value)
                                       }} />
                                       {error && !productPrice && <span style={{ color: 'red' }}>Enter valid price</span>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                       <Form.Label>Product Category</Form.Label>
                                       <Form.Control type="text" placeholder="Enter Product Category" onChange={(e) => {
                                          setProductCategory(e.target.value)
                                       }} />
                                       {error && !productCategory && <span style={{ color: 'red' }}>Enter valid product</span>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                       <Form.Label>Product Company</Form.Label>
                                       <Form.Control type="text" placeholder="Enter Product Company" onChange={(e) => {
                                          setProductCompany(e.target.value)
                                       }} />
                                       {error && !productCompany && <span style={{ color: 'red' }}>Enter valid company</span>}
                                    </Form.Group>
                                    <Button variant="primary" onClick={() => { submitProduct() }} >
                                       Submit
                                    </Button>
                                 </Form>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </section>
         </>
      </div>
   )
}
