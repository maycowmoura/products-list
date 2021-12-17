import React from 'react';
import './App.css';
import { MainContextProvider } from './contexts/MainContext';
import { IconContext } from "react-icons";
import Header from './components/Header';
import Content from './components/Content';
import AddProductModal from './components/AddProductModal';

function App() {

  return (
    <MainContextProvider>
      <IconContext.Provider value={{ className: 'icon' }}>
        <Header />
        <Content />
        <AddProductModal />
      </IconContext.Provider>
    </MainContextProvider>
  );
}

export default App;
