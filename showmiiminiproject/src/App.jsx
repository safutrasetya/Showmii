import { useState } from 'react'
import {BrowserRouter, Routes, Route, Link, Outlet} from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Explore from './pages/Explore/Explore';
import DetailImage from './pages/DetailImage/DetailImage';
import UploadImage from './pages/UploadImage/UploadImage';
import EditImageInfo from './pages/EditImageInfo/EditImageInfo';
import Authentication from './components/Authentication/Authentication';
// import { Modal } from './components/Modal/Modal';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/landingpage'  element={<LandingPage/>}></Route>
          <Route path='/login'  element={<Login/>}></Route>
          <Route path='/register'  element={<Register/>}></Route>

          <Route path='/'  element={<Authentication/>}>
            <Route path='/explore'  element={<Explore/>}></Route>
            <Route path='/detailimage'  element={<DetailImage/>}></Route>
            <Route path='/uploadimage'  element={<UploadImage/>}></Route>
            <Route path='/editdimageinfo'  element={<EditImageInfo/>}></Route>
          </Route>

          {/* <Route path='/modaltest'  element={<Modal/>}></Route> */}
        </Routes>
      
      </BrowserRouter>

    </>
  )
}

export default App
