import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { useMainContext } from '../../../contexts/MainContext';
import { formatPrice } from '../../../utils';
import api from '../../../api';
import { formatDistanceToNowStrict, format } from 'date-fns';
import { BiEdit, BiMinusCircle as Minus, BiPlusCircle as Plus } from 'react-icons/bi';



export default function ProductCard({ productData, index }) {
  const { setCurrentEditingProduct, setShowAddProductModal } = useMainContext()
  const [amount, setAmount] = useState(1);
  const amountTimeout = useRef(null);

  useEffect(() => {
    setAmount(productData.amount)
  }, [productData.amount])

  function editProduct() {
    setCurrentEditingProduct({ ...productData });
    setShowAddProductModal(true);
  }

  function editAmount(newAmount) {
    newAmount = newAmount <= 0 ? 1 : newAmount;
    setAmount(newAmount);

    amountTimeout.current && clearTimeout(amountTimeout.current);
    amountTimeout.current = setTimeout(() => {
      api.put(`/products/${productData.id}/amount/${newAmount}`)
        .then(resp => {
          if (resp.data.error) {
            alert(`Ocorreu um erro ao atualizar a quantidade de "${productData.name}"`);
            console.log(resp.data.error);
          }
        })
        .catch(error => {
          alert('Erro no envio de informações.')
          console.log(error);
        });
    }, 1000)
  }

  
  return (
    <div className="card p-4" style={{ animationDelay: `${index * 0.15}s` }}>
      <h4>{productData.name}</h4>

      <div className="row">
        <div className="col-8">
          <h6>{formatPrice(productData.price)} <small>cada</small></h6>
        </div>
        <div className="col-4 user-select-none">
          <Minus className="cursor-pointer me-2" onClick={() => editAmount(amount - 1)} />
          {amount}
          <Plus className="cursor-pointer ms-2" onClick={() => editAmount(amount + 1)} />
        </div>
      </div>

      <div>
        <span className="badge bg-secondary me-2 capitalize-first">{productData.category.toLowerCase()}</span>
        {!!productData.perishable &&
          <span className="badge bg-warning me-2 text-dark">Perecível</span>
        }
      </div>
      <BiEdit className="edit" onClick={editProduct} />

      <small className="last-update text-muted" title={format(productData.last_edition, 'dd/MM/yyy HH:mm:ss')}>
        <i>Atualizado há {formatDistanceToNowStrict(productData.last_edition)}</i>
      </small>
    </div>
  );
}