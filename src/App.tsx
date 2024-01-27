import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/User/Login" element={<Login/>} />
        <Route path="/User/Register" element={<Register/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
