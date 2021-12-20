import React, { useState, useRef, useEffect } from 'react';
import './style.css';
import { useMainContext } from '../../../contexts/MainContext';
import { formatPrice } from '../../../utils';
import api from '../../../api';
import { formatDistanceToNowStrict, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { BiEdit, BiMinusCircle as Minus, BiPlusCircle as Plus } from 'react-icons/bi';
import { BsFillTagFill } from 'react-icons/bs';
import { FaRegClock } from 'react-icons/fa';



export default function ProductCard({ productData }) {
  const { setCurrentEditingProduct, setShowAddProductModal, setProducts, toast } = useMainContext()
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
    setProducts(products => products.map(product => {
      if (product.id === productData.id) product.amount = newAmount;
      return product;
    }))

    amountTimeout.current && clearTimeout(amountTimeout.current);
    amountTimeout.current = setTimeout(() => {
      api.put(`/products/${productData.id}/amount/${newAmount}`)
        .then(resp => {
          if (resp.data.error) {
            toast.error(`Ocorreu um erro ao atualizar a quantidade de "${productData.name}"`);
            console.log(resp.data.error);
          }
        })
        .catch(error => {
          toast.error('Erro no envio de informações.')
          console.log(error);
        });
    }, 1000)
  }


  return (
    <div className="card p-4 shadow">
      <h4>{productData.name.toUpperCase()}</h4>

      <div className="row my-1">
        <div className="col-7">
          <h6>{formatPrice(productData.price)} <small>cada</small></h6>
        </div>
        <div className="col-5 user-select-none">
          <Minus className="cursor-pointer me-2" onClick={() => editAmount(amount - 1)} />
          <strong>{amount}</strong>
          <Plus className="cursor-pointer ms-2" onClick={() => editAmount(amount + 1)} />
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-7">
          <span className="badge bg-secondary me-2">
            <BsFillTagFill className="mt-0" /> {productData.category.toLowerCase()}
          </span>
          {!!productData.perishable &&
            <span className="badge bg-warning me-2 text-dark">
              <FaRegClock className="mt-0" /> Perecível
            </span>
          }
        </div>
        <div className="col-5">
          <strong>Total {formatPrice(amount * productData.price)}</strong>
        </div>
      </div>
      <BiEdit className="edit d-md-none text-primary" onClick={editProduct} />

      <small className="last-update text-muted" title={'Última atualização em ' + format(productData.last_edition * 1000, 'dd/MM/yyy HH:mm:ss')}>
        <i>Atualizado há {formatDistanceToNowStrict(productData.last_edition * 1000, { locale: ptBR })}</i>
      </small>
    </div >
  );
}