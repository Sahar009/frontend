
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Sidebar from './component/sidebar/Sidebar';
import Layout from './component/layout/Layout';
import Dashboard from './pages/dashboard/Dashboard';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Register from './pages/Auth/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './service/authService';
import { SET_LOGIN } from './redux/features/authSlice';
import Contact from './pages/contact/Contact';


axios.defaults.withCredentials = true

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    async function loginStatus(){
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  
  }, [dispatch])
  
  return (<>
<ToastContainer/>
   <BrowserRouter>
   
   <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/login' element={<Login/>}/>
<Route path="/register" element={<Register/>} />


<Route path='/dashboard' element={
  <Layout>
    <Dashboard/>
  </Layout>
}/>
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
              <Contact />
              </Layout>
            </Sidebar>
          }
        />

   </Routes>
   
   
   
   </BrowserRouter>
   </>
  );
}

export default App;
