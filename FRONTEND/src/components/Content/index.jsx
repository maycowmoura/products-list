import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useMainContext } from '../../contexts/MainContext';
import SpinnerLoader from '../SpinnerLoader';
import ProductCard from './ProductCard';

export default function Content() {
  const { products, setProducts } = useMainContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/products')
      .then(resp => {
        if (resp.data.error) {
          alert(`Ocorreu um erro ao carregar os productos.`);
          console.log(resp.data.error);
        } else {
          console.log(resp.data)
          setProducts(resp.data);
          setIsLoading(false);
        }
      })
      .catch(error => {
        alert('Erro ao receber as informações.')
        console.log(error);
      });
  }, []) //eslint-disable-line


  return (
    <div className="container py-4">
      {isLoading ? (
        <div className="p-5 my-5 text-center">
          <SpinnerLoader />
          <p className="mt-3">carregando produtos...</p>
        </div>
      ) : (
        <div className="row gy-4">
          {products.map((product, i) =>
            <div className="col-12 col-md-6">
              <ProductCard productData={product} key={product.id} index={i} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
