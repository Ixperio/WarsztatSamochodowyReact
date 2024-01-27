import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
// import NavBar from './components/NavBar/NavBar'
import Details from './pages/Details'

function App() {

  return (
    <>
    <Header></Header>
    {/* <NavBar/> */}
    <Routes>
      {/* <Route path='/details' element={<Details/>}/> */}
      <Route path='/details/:id' element={<Details/>}/>
    </Routes>
    <Footer></Footer>
    </>
  )
}

export default App
