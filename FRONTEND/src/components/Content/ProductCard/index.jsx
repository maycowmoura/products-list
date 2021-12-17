import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { useMainContext } from '../../../contexts/MainContext';
import { formatPrice } from '../../../utils';
import api from '../../../api';
import { formatDistanceToNowStrict, format } from 'date-fns';
import { BiEdit, BiMinusCircle as Minus, BiPlusCircle as Plus } from 'react-icons/bi';



export default function ProductCard({ productData }) {
  const { setCurrentEditingProduct, setShowAddProductModal } = useMainContext()
  const [amount, setAmount] = useState(productData.amount ?? 1);
  const amountTimeout = useRef(null);

  useEffect(() => {
    amountTimeout.current && clearTimeout(amountTimeout.current);
    amountTimeout.current = setTimeout(() => {
      api.put(`/products/${productData.id}/amount/${amount}`)
        .then(resp => {
          if (resp.error) alert(`Ocorreu um erro ao atualizar a quantidade de "${productData.name}"`);
          console.log(resp.error);
        });
    }, 3000)
  }, [amount]) //eslint-disable-line

  function editProduct() {
    setCurrentEditingProduct(productData);
    setShowAddProductModal(true);
  }


  return (
    <div className="card p-4">
      <h4>{productData.name}</h4>

      <div className="row">
        <div className="col-8">
          <h6>{formatPrice(productData.price)} <small>cada</small></h6>
        </div>
        <div className="col-4 user-select-none">
          <Minus className="cursor-pointer me-2" onClick={() => setAmount(v => --v)} />
          {amount}
          <Plus className="cursor-pointer ms-2" onClick={() => setAmount(v => ++v)} />
        </div>
      </div>

      <div>
        <span className="badge bg-secondary me-2">{productData.category}</span>
        {!!productData.perishable &&
          <span className="badge bg-warning me-2 text-dark">Perecível</span>
        }
      </div>
      <BiEdit className="edit" onClick={editProduct} />

      <small className="last-update text-muted" title={format(productData.lastEdition, 'dd/MM/yyy HH:mm:ss')}>
        <i>Atualizado há {formatDistanceToNowStrict(productData.lastEdition)}</i>
      </small>
    </div>
  );
}