import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useMainContext } from '../../contexts/MainContext';
import SpinnerLoader from '../SpinnerLoader';
import ProductCard from './ProductCard';
import { BsCartX } from 'react-icons/bs';
import { IoReloadSharp } from 'react-icons/io5';

export default function Content() {
  const { products, setProducts, toast } = useMainContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hideLoadMore, setHideLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/products?page=${page}`)
      .then(resp => {
        if (resp.data.error) {
          toast.error(`Ocorreu um erro ao carregar os productos.`);
          console.log(resp.data.error);
        } else if (resp.data.length) {
          setProducts(products => {
            const allProducts = [...products, ...resp.data];

            // remove duplicate products
            const reduced = allProducts.reduce((all, product) => {
              if (!all.ids.includes(product.id)) {
                all.products.push(product);
              }
              all.ids.push(product.id);
              return all;
            }, { ids: [], products: [] });

            return reduced.products;
          });
        }

        setIsLoading(false);
        setIsLoadingMore(false);
        setHideLoadMore(false);

        // if there's no products on resp it hides the loadMore btn
        if (!resp.data.length) {
          setHideLoadMore(true);
        }
      })
      .catch(error => {
        toast.error('Erro ao receber as informações.')
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
      ) : !products.length ? (
        <div className="text-center text-muted pt-5">
          <BsCartX className="mt-5 mb-3" size="50px" />
          <p>Nenhum produto cadastrado ainda.</p>
        </div>
      ) : (
        <div className="row gy-4">
          {products.map(product =>
            <div className="col-12 col-md-6 col-xl-4" key={product.id} >
              <ProductCard productData={product} />
            </div>
          )}
        </div>
      )}

      <div className="load-more mx-2 my-5 pb-5 text-center text-success">
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
