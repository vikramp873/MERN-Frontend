import logo from './logo.svg';
import './App.css';
import Nav from './component/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './component/Signup';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import Products from './component/Products';
import LoadProducts from './component/LoadProduct';
import UpdateProduct from './component/UpdateProduct';

function App() {
  return (
    <div className="">
      <header className="">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route element={<PrivateComponent />} >
              <Route path="/" element={<h1>Home</h1>} />

              <Route path="/add-products" element={<Products />} />
              <Route path="/list-products" element={<LoadProducts />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1>Logout</h1>} />
            </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>

        </BrowserRouter>
        {/* <h1>Hi</h1> */}
      </header>
    </div>
  );
}

export default App;
