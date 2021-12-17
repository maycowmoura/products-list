import React, { useState, useContext } from 'react';


const MainContext = React.createContext({});

export function MainContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [currentEditingProduct, setCurrentEditingProduct] = useState(null);

  return (
    <MainContext.Provider value={{
      products,
      setProducts,
      showAddProductModal,
      setShowAddProductModal,
      currentEditingProduct,
      setCurrentEditingProduct
    }}>
      {children}
    </MainContext.Provider>
  )
}


export function useMainContext() {
  return useContext(MainContext);
};