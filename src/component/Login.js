import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(false);
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


         let data = await fetch('http://localhost:4000/login', {
            method: "POST",
            body: JSON.stringify({ email: email, password: password }),
            headers: {
               'content-type': 'application/json'
            }
         })

         data = await data.json()
         console.log(data)
         if (data.body) {
            alert('Login successfully');
            localStorage.setItem("user", JSON.stringify(data))
            localStorage.setItem("token", JSON.stringify(data.token))
            navigate('/add-products');
         }
         else {
            alert("Please enter correct details")
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
            </div>

         </section>
      </div>
   )
}
