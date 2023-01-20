import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function NavBar() {

   const navigate = useNavigate();

   const auth = JSON.parse(localStorage.getItem('user'));
   console.log(auth);

   const clearData = () => {
      localStorage.clear();
      navigate('/login');
   }

   return (
      <div>
         {
            auth ?

               <Navbar bg="dark" variant="dark" expand='md'>
                  <Container>
                     <Navbar.Brand >HRIS</Navbar.Brand>
                     <Navbar.Toggle aria-controls="basic-navbar-nav" />
                     <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        <Nav >
                           <Nav.Item>
                              <Nav.Link><Link to="/add-products" className='before-login'>Add Products</Link></Nav.Link>
                           </Nav.Item>
                           <Nav.Item>
                              <Nav.Link > <Link to="/list-products" className='before-login'>List Products</Link> </Nav.Link>
                           </Nav.Item>
                           <Nav.Item>
                              <Nav.Link >
                                 <Link to="/signup" onClick={clearData} className='before-login'> Logout  </Link>
                              </Nav.Link>
                           </Nav.Item>
                           <Nav.Item>

                              <Nav.Link >
                                 <Link className='before-login'>
                                    <span>Welcome  {auth.body.name} </span> </Link>
                              </Nav.Link>
                           </Nav.Item>

                        </Nav>
                     </Navbar.Collapse>
                  </Container>
               </Navbar>


               :
               <>
                  <Navbar bg="dark" variant="dark" expand='lg' >
                     <Container>
                        <Navbar.Brand>HRIS</Navbar.Brand>
                        <Nav className="justify-content-end">

                           <Nav.Link >
                              {auth ? null : <> <Link to="/signup" className='before-login' > Signup</Link> <Link to="/login" className='before-login'> Login</Link></>}
                           </Nav.Link>

                        </Nav>
                     </Container>
                  </Navbar>
               </>
         }



      </div>
   )
}

export default NavBar;
