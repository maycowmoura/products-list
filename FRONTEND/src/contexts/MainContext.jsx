import React, { useState, useContext } from 'react';


const MainContext = React.createContext({});

export function MainContextProvider({ children }) {
  const [products, setProducts] = useState(null);
  const [currentEditingProduct, setCurrentEditingProduct] = useState(null);

  return (
    <MainContext.Provider value={{
      products,
      setProducts,
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