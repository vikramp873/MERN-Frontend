import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from "axios";
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import './style.css'

const PORT = 'https://mernbackend-gzhr.onrender.com';
function LoadProduct() {

   const [productData, setProductData] = useState([]);
   const [loading, setFirstLoad] = useState(false)

   useEffect(() => {

      getProductData();


   }, [])

   async function getProductData() {

      const token = JSON.parse(localStorage.getItem('token'));
      console.log(token)



      let data = await axios.get(`${PORT}/get-data`, {
         headers: {
            'authorization': `bearer ${token}`
         }
      });

      setProductData(data.data.data)
   }


   const deleteData = async (id) => {

      setFirstLoad(true)

      let data = await axios.delete(`${PORT}/delete/${id}`);
      console.log(data);

      setFirstLoad(false)
      getProductData();
   }




   return (
      <div className='mt-4'>
         <section className="over-y-hide">
            <div className="container">
               <div className="row ">
                  <div className="col-sm-12 col-md-7 col-lg-8 mx-auto mt50">

                     <div className='dots' >

                        <ThreeDots type="ThreeDots" color="#000" style={{ display: 'flex', justifyContent: 'center' }} className='dots' height={100} width={90} visible={loading} />
                     </div>
                     <div className="card card-signin mb-3">
                        <div className="card-body"    >

                           <div className="form-signin" >
                              <Table striped bordered hover responsive='sm' >
                                 <thead>
                                    <tr>
                                       <th>Name</th>
                                       <th>Category</th>
                                       <th>Company</th>
                                       <th>Price</th>
                                       <th>Operation</th>
                                    </tr>
                                 </thead>

                                 {


                                    productData && productData.length > 0 ?



                                       productData.map((data) => {
                                          return (



                                             <tbody>
                                                <tr>
                                                   <td>{data.name} </td>
                                                   <td>{data.category}</td>
                                                   <td>{data.company}</td>
                                                   <td>{data.price}</td>
                                                   <td><button onClick={() => deleteData(data._id)}>delete</button>
                                                      <Link to={'/update/' + data._id} >  update</Link>
                                                   </td>

                                                </tr>

                                             </tbody>

                                          )
                                       })
                                       :
                                       <h1>No data found!!</h1>
                                 }
                              </Table>
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

export default LoadProduct;
