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

function App() {


  return (
  <>
    <Header/>
    <Routes>
      <Route path='/list' element={<List/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/details' element={<Details/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path="/User/Login" element={<Login/>} />
      <Route path="/User/Register" element={<Register/>} />
    </Routes>
    <Footer />
  </>
  )
}

export default App;
