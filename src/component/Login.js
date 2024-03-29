import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// const Loader = loadable(() => import('react-loader-spinner' /* webpackChunkName: "Loader"  */));
import './style.css'
import { ThreeDots } from 'react-loader-spinner'

const PORT = 'https://mernbackend-gzhr.onrender.com';

export default function Login() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(false);
   const [loading, setFirstLoad] = useState(false)
   const navigate = useNavigate()

   useEffect(() => {
      const auth = localStorage.getItem('user');
      if (auth) {
         navigate('/')
      }
   }, [])

   const login = async (e) => {
      e.preventDefault();


      if (!email || !password) {
         setError(true)
      }
      else {
         setFirstLoad(true)


         let data = await fetch(`${PORT}/login`, {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: {
               'content-type': 'application/json'
            }
         })

         data = await data.json()
         console.log(data)
         if (data.body) {
            setFirstLoad(false)

            alert('Login successfully');
            localStorage.setItem("user", JSON.stringify(data))
            localStorage.setItem("token", JSON.stringify(data.token))
            navigate('/add-products');
         }
         else {
            alert("Please enter correct details")

            setFirstLoad(false)
         }
      }
   }
   return (
      <div>

         <h1 className='text-center my-4' >Login</h1>
         <section className="over-y-hide">



            <div className="container">
               <div className="row ">

                  <div className="col-sm-12 col-md-7 col-lg-5 mx-auto mt50">
                     <div className="card card-signin mb-3">
                        <div className="card-body" >

                           <div className="form-signin" >


                              <Form>
                                 <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => {
                                       setEmail(e.target.value)
                                    }}


                                    />

                                    {error && !email && <span style={{ color: 'red' }}>Enter Email</span>}
                                 </Form.Group>

                                 <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => {
                                       setPassword(e.target.value)
                                    }} />

                                    {error && !password && <span style={{ color: 'red' }}>Enter Password</span>}
                                 </Form.Group>
                                 <Button variant="primary" type="submit" onClick={login} >
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
      </div>
   )
}
