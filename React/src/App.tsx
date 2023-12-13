import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Layout from './pages/Layout/layout';
import Home from './pages/Home/home';
import Cards from './pages/Cards/cards';
import About from './pages/About/about';
import CardMoreInfo from './pages/CardMoreInfo/cardData';

const App = () => { 
  return (
    
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="cards" element={<Cards />}/>
        <Route path="about" element={<About />}/>
        <Route path="cards/:id" element={<CardMoreInfo/>}/>
      </Route>
    </Routes>
  </BrowserRouter> 
    
  );
}

export default App
