import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../App.css'
import Header from './Header';
import Main from './Main';
// import SavedNews from '../SavedNews/SavedNews'; // Componente para dados da API
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />

        <Routes>
          {/* Rota principal - página inicial */}
          <Route path="/" element={<Main />} />

          {/* Rota personalizada - dados da API */}
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
