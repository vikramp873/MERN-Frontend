import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './style.css'
import { ThreeDots } from 'react-loader-spinner'
const PORT = 'https://mernbackend-gzhr.onrender.com';

export default function Signup() {

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const [loading, setFirstLoad] = useState(false)

   const [error, setError] = useState(false);
   const navigate = useNavigate()

   useEffect(() => {
      const auth = localStorage.getItem('user');
      if (auth) {
         navigate('/');
      }
   }, [])

   const submitData = async (e) => {
      e.preventDefault();


      if (!name || !email || !password) {
         setError(true)
      }
      else {

         setFirstLoad(true)
         let data = await fetch(`${PORT}/signup`, {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
               'content-type': 'application/json'
            }
         })

         data = await data.json()
         console.log(data);

         if (data.success) {

            setFirstLoad(false)
            alert('User created, Please login')
            // localStorage.setItem('user', JSON.stringify(data));
            navigate('/login')
         }
         else {
            alert('user already exists')

            setFirstLoad(false)
         }
      }

   }
   return (
      <>
         <h1 className='text-center my-4' >Register</h1>

         <section className="over-y-hide">
            <div className="container">
               <div className="row ">
                  <div className="col-sm-12 col-md-7 col-lg-5 mx-auto mt50">
                     <div className="card card-signin mb-3">
                        <div className="card-body" >
                           {/* <span className="sign_icon_img">SIGN IN

                           </span> */}
                           <div className="form-signin" >


                              <Form>
                                 <Form.Group className="mb-3" >
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => {
                                       setName(e.target.value)
                                    }} />

                                    {error && !name && <span style={{ color: 'red' }}>Enter Name</span>}

                                 </Form.Group>

                                 <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Email" onChange={(e) => {
                                       setEmail(e.target.value)
                                    }} />

                                    {error && !email && <span style={{ color: 'red' }}>Enter Email</span>}
                                 </Form.Group>

                                 <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" onChange={(e) => {
                                       setPassword(e.target.value)
                                    }} />

                                    {error && !password && <span style={{ color: 'red' }}>Enter Password</span>}
                                 </Form.Group>

                                 <Button variant="primary" type="submit" onClick={submitData}>
                                    Submit
                                 </Button>
                              </Form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className='dots' >

                  <ThreeDots type="ThreeDots" color="#000" style={{ display: 'flex', justifyContent: 'center' }} className='dots' height={100} width={90} visible={loading} />
               </div>
            </div>

         </section>
      </>
   )
}
