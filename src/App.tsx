import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Details from './pages/Details'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
    <Header></Header>
    <Routes>
      <Route path='/details' element={<Details/>}/>
      <Route path='/details/:id' element={<Details/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    <Footer></Footer>
    </>
  )
}

export default App
