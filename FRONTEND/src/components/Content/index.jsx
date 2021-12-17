import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useMainContext } from '../../contexts/MainContext';
import SpinnerLoader from '../SpinnerLoader';
import ProductCard from './ProductCard';
import { IoReloadSharp } from 'react-icons/io5';

export default function Content() {
  const { products, setProducts } = useMainContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/products?page=${page}`)
      .then(resp => {
        if (resp.data.error) {
          alert(`Ocorreu um erro ao carregar os productos.`);
          console.log(resp.data.error);
        } else if (resp.data.length) {
          setProducts(products => [...products, ...resp.data]);
        }

        setIsLoading(false);
        setIsLoadingMore(false);

        // if there's no products on resp or if it has less products than a page (usually 5 per page), it hides the loadMore btn
        if (!resp.data.length || resp.data.length < (products.length / (page - 1))) {
          setHideLoadMore(true);
        }
      })
      .catch(error => {
        alert('Erro ao receber as informações.')
        console.log(error);
      });
  }, [page]) //eslint-disable-line


  function loadMore() {
    setIsLoadingMore(true);
    setPage(p => ++p);
  }


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
            <div className="col-12 col-md-6 col-xl-4">
              <ProductCard productData={product} key={product.id} index={i} />
            </div>
          )}
        </div>
      )}

      <div className="load-more mx-2 my-5 text-center text-success">
        {isLoadingMore ? (
          <SpinnerLoader />

        ) : !hideLoadMore && (
          <span className="cursor-pointer" onClick={loadMore}>
            <IoReloadSharp /> Carregar mais
          </span>
        )}
      </div>
    </div>
  );
}
