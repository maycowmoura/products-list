import { useState } from 'react';
import './App.css';
import { IconContext } from "react-icons";
import Header from './components/Header';
import AddProductModal from './components/AddProductModal';

function App() {
  const [showAddProduct, setShowAddProduct] = useState(!false);

  return (
    <IconContext.Provider value={{ className: 'icon' }}>
      <Header />
      <div className="container">

      </div>

      {showAddProduct &&
        <AddProductModal hideModal={() => setShowAddProduct(false)} />
      }
    </IconContext.Provider>
  );
}

export default App;
