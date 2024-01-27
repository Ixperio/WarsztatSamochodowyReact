import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Details from './pages/Details'
import NotFound from './pages/NotFound'
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {


  return (
  <>
    <Header/>
    <Routes>
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

export default App
