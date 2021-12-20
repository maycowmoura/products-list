import React, { useState, useEffect } from 'react';
import './style.css';
import { useMainContext } from '../../contexts/MainContext';
import { formatPrice } from '../../utils';
import { BsCart3 } from 'react-icons/bs';

export default function Footer() {
  const { products } = useMainContext();
  const [total, setTotal] = useState(0);
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    setTotal(products.reduce((total, product) => {
      return total += product.amount * product.price
    }, 0))

    setAnimationClass('animate');
  }, [products])


  return (
    <footer>
      <div className="row p-3 align-items-center bg-primary text-white">
        <div className="col col-md-2 fs-2 mx-3 mx-md-0"><BsCart3 /></div>
        <div className="col col-md-4 text-end">Total do carrinho:</div>
        <div
          className={'col-5 fs-3 overflow-hidden ' + animationClass}
          onAnimationEnd={() => setAnimationClass('')}
        >
          {formatPrice(total)}
        </div>
      </div>
    </footer>
  );
}
