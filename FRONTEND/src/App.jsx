import React from 'react';
import './App.css';
import { IconContext } from "react-icons";
import { useMainContext } from './contexts/MainContext';
import Header from './components/Header';
import Content from './components/Content';
import AddProductModal from './components/AddProductModal';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App() {
  const { showAddProductModal, ToastContainer } = useMainContext();

  return (
    <IconContext.Provider value={{ className: 'icon' }}>
      <Header />
      <Content />
      {showAddProductModal && <AddProductModal />}
      
      <ToastContainer
        position="top-right"
        theme="colored"
      />
    </IconContext.Provider>
  );
}

