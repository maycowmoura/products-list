import React, { useRef, useEffect } from 'react';
import './style.css';
import { useMainContext } from '../../contexts/MainContext';
import logo from './logo.png';
import { BsCartPlus } from 'react-icons/bs';

export default function Header() {
  const { setShowAddProductModal } = useMainContext();
  const header = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > (header.current.offsetHeight + 30)
        ? document.body.classList.add('header-fixed')
        : document.body.classList.remove('header-fixed')
    })
  }, [])

  return (
    <header ref={header}>
      <div className="container">
        <div>
          <img src={logo} alt="Logo Store" />
        </div>
        <div></div>
        <div>
          <button className="btn btn-primary" onClick={() => setShowAddProductModal(true)}>
            <BsCartPlus className="me-0" />
            <span className="d-none d-md-inline-block ms-2">Novo Produto</span>
          </button>
        </div>
      </div>
    </header>
  );
}
