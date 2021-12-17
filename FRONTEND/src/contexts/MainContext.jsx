import React, { useState, useContext } from 'react';


const MainContext = React.createContext({});

export function MainContextProvider({ children }) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Produto de teste',
      price: 17.90,
      category: 'Legume',
      perishable: 1,
      last_edition: (new Date()).getTime()
    }, {
      id: 2,
      name: 'Novo produto',
      price: 5.77,
      category: 'Carne',
      perishable: 0,
      last_edition: (new Date()).getTime()
    }
  ]);
  const [showAddProductModal, setShowAddProductModal] = useState(!true);
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