import React, { useState, useEffect } from 'react';
import './style.css'
import { useMainContext } from '../../contexts/MainContext';
import api from '../../api';
import SpinnerLoader from '../SpinnerLoader';
import { BiTrash, BiSave } from 'react-icons/bi';
import { BsPlusCircle, BsCart2, BsGrid3X2Gap, BsTag } from 'react-icons/bs';
import { MdOutlineMonetizationOn as Price } from 'react-icons/md';




export default function AddProductModal({ hideModal }) {
  const { currentEditingProduct: productData } = useMainContext();
  const [disableButton, setDisableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(productData?.name ?? '');
  const [price, setPrice] = useState(productData?.price ?? 'R$ 0,00');
  const [amount, setAmount] = useState(productData?.amount ?? 1);
  const [category, setCategory] = useState(productData?.category ?? '');
  const [perishable, setPerishable] = useState(productData?.perishable ?? 0);


  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [])

  useEffect(() => {
    const isValid = name.trim() !== '' && price.trim() !== '' && Number(amount) >= 1 && category.trim() !== ''
    setDisableButton(!isValid);
  }, [name, price, amount, category])

  function priceValidator(e) {
    let rawPrice = price.replace(/[^\d]/g, '');

    if(/\d/.test(e.key)){
      rawPrice += e.key;
    } else if(e.keyCode === 8 || e.keyCode === 46){ // backspace or delete
      rawPrice = rawPrice.replace(/\d$/, '');
    } else {
      return;
    }

    const parsedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(rawPrice / 100);

    setPrice(parsedValue);
  }


  function saveProduct() {
    const rawPrice = price.replace(/[^\d]/g, '') / 100;
    
    if (name.trim().length < 3 || name.trim().length > 30) {
      alert('Por favor, o nome deve conter entre 3 e 30 caracteres.');
      return;

    } else if (rawPrice == 0) { // eslint-disable-line
      alert('O preço precisa ser maior que zero.');
      return;

    } else if (category.trim().length < 3 || category.trim().length > 30) {
      alert('Por favor, a categoria deve conter entre 3 e 30 caracteres.');
      return;

    } else if (Number(amount) < 1) {
      alert('Por favor, insira ao menos uma quantidade.');
      return;
    }

    setIsLoading(true);

    function success(resp) {
      if(resp.data.error){
        alert('Ocorreu um erro: ' + resp.data.error);
      } else if (resp.data.ok){
        alert('Produto editado com sucesso!');
        hideModal();

      } else {
        alert('Falta tratar o cadastro.');
        hideModal();
        /**
         *
         *
         *
         * TRATAR CADASTRO
         *
         *
         */
      }
    }


    api.request({
      method: productData ? 'put' : 'post',
      url: '/products' + (productData ? `/${productData.id}` : ''),
      data: { name, price: rawPrice, amount, category, perishable }

    })
      .then(success)
      .catch(error => {
        alert('Algo deu errado... Consulte o console.');
        console.log(error);

      })
      .finally(() => setIsLoading(false))
  }



  return (
    <>
      <div id="add-product-modal" className="modal show d-block" tabIndex="-1" onClick={hideModal}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" onClick={e => e.stopPropagation()}>
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                <BsPlusCircle /> {productData ? 'Editar produto' : 'Adicionar produto'}
              </h5>
              <button type="button" className="btn-close" onClick={hideModal}></button>
            </div>


            <fieldset className="modal-body" disabled={isLoading}>
              <label className="form-label"><BsCart2 /> Nome do Produto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Produto"
                maxLength="30"
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <label className="form-label mt-4"><Price /> Preço</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Insira o preço do produto"
                value={price}
                onKeyDown={e => priceValidator(e)}
              />

              <label className="form-label mt-4"><BsGrid3X2Gap /> Quantidade</label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantidade"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />

              <label className="form-label mt-4"><BsTag /> Categorias</label>
              <input
                type="text"
                className="form-control"
                maxLength="30"
                placeholder="Digite as categorias do produto"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />

              <div className="form-check mt-4">
                <input
                  id="check"
                  type="checkbox"
                  className="form-check-input cursor-pointer"
                  checked={perishable}
                  onChange={e => setPerishable(e.target.checked ? 1 : 0)}
                />
                <label className="form-check-label cursor-pointer" htmlFor="check">Este é um produto perecível.</label>
              </div>
            </fieldset>

            <fieldset className="modal-footer" disabled={isLoading}>
              {productData &&
                <button type="button" className="btn btn-danger">
                  <BiTrash /> Excluir produto
                </button>
              }
              <button type="button" className="btn btn-primary" onClick={saveProduct} disabled={disableButton}>
                {isLoading ? (
                  <SpinnerLoader />
                ) : (
                  <><BiSave /> Salvar produto</>
                )}
              </button>
            </fieldset>

          </div>
        </div>
      </div>

      <div className="modal-backdrop show"></div>
    </>
  );
}
