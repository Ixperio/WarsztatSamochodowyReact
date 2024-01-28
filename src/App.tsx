import { Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Details from './pages/Details'
import NotFound from './pages/NotFound'
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/Home';
import List from './pages/List';
import Profile from './pages/Profile';
import Edit from './pages/Edit';
import DeleteUser from './pages/DeleteUser';
import CarDetails from './pages/List/[id]';
import AddCar from './pages/AddCar';

function App() {


  return (
  <>
    <Header/>
    <Routes>
      <Route path='/list' element={<List/>}/>
      <Route path='/list/:id' element={<CarDetails/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path="/User/Login" element={<Login/>} />
      <Route path="/User/Register" element={<Register/>} />
      <Route path="/User/Profile" element={<Profile/>} />
      <Route path="/User/Edit" element={<Edit/>} />
      <Route path="/User/Delete" element={<DeleteUser/>} />
      <Route path="/AddCar" element={<AddCar/>} />
    </Routes>
    <Footer />
  </>
  )
}

export default App;
