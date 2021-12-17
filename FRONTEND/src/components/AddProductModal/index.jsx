import React, { useState, useEffect } from 'react';
import './style.css'
import { useMainContext } from '../../contexts/MainContext';
import { formatPrice } from '../../utils';
import api from '../../api';
import SpinnerLoader from '../SpinnerLoader';
import { BiTrash, BiSave } from 'react-icons/bi';
import { BsPlusCircle, BsCart2, BsGrid3X2Gap, BsTag } from 'react-icons/bs';
import { MdOutlineMonetizationOn as Price } from 'react-icons/md';




export default function AddProductModal() {
  const { currentEditingProduct: productData, setCurrentEditingProduct, setProducts, setShowAddProductModal } = useMainContext();
  const [disableButton, setDisableButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('R$ 0,00');
  const [amount, setAmount] = useState(1);
  const [category, setCategory] = useState('');
  const [perishable, setPerishable] = useState(0);

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
      setCurrentEditingProduct(null);
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    const isValid = name.trim() !== '' && String(price).trim() !== '' && Number(amount) >= 1 && category.trim() !== ''
    setDisableButton(!isValid);
  }, [name, price, amount, category])

  useEffect(() => {
    if (!productData) return;
    setName(productData.name);
    setPrice(formatPrice(productData.price));
    setAmount(productData.amount ?? 1);
    setCategory(productData.category);
    setPerishable(productData.perishable);
  }, [productData])


  function hideModal() {
    setShowAddProductModal(false);
  }

  function priceValidator(e) {
    let rawPrice;

    if (e.target.selectionStart === 0 && e.target.value.length === e.target.selectionEnd) { // if the value is selected, it sets to zero
      rawPrice = 0;
    } else {
      rawPrice = price.replace(/[^\d]/g, '');
    }

    if (/\d/.test(e.key)) {
      rawPrice += e.key;
    } else if (e.keyCode === 8 || e.keyCode === 46) { // backspace or delete
      rawPrice = rawPrice.replace(/\d$/, '');
    } else {
      return;
    }

    setPrice(formatPrice(rawPrice / 100));
  }


  function deleteProduct() {
    if (!window.confirm(`Realmente quer deletar "${productData.name}"?`)) {
      return;
    }

    setIsLoading(true);

    api.delete(`/products/${productData.id}`)
      .then(resp => {
        if (resp.data.error) {
          alert(`Ocorreu um erro ao deletar "${productData.name}"`);
          console.log(resp.data.error);

        } else if (resp.data.ok) {
          setProducts(products => products.filter(product =>
            product.id !== productData.id
          ));
          hideModal();
        }
      })
      .catch(error => {
        alert('Erro no envio de informações.')
        console.log(error);
      })
      .finally(() => setIsLoading(false));
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
      if (resp.data.error) {
        alert('Ocorreu um erro: ' + resp.data.error);
      } else if (resp.data.ok) {
        alert('Produto editado com sucesso!');
        hideModal();
        setProducts(products => products.map(product =>
          product.id === productData.id
            ? { ...productData, name, price: rawPrice, amount, category, perishable }
            : product
        ))

      } else {
        alert('Produto cadastrado com sucesso.');
        hideModal();
        setProducts(products => [...products, resp.data]);
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
                maxLength="15"
                value={price}
                onKeyDown={e => priceValidator(e)}
                onChange={() => { }}
                onFocus={e => e.target.setSelectionRange(15, 15)}
                onClick={e => e.target.setSelectionRange(15, 15)}
              />

              <label className="form-label mt-4"><BsGrid3X2Gap /> Quantidade</label>
              <input
                type="number"
                className="form-control"
                placeholder="Quantidade"
                value={amount}
                onChange={e => e.target.value < 1 ? setAmount(1) : setAmount(e.target.value)}
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
                <button type="button" className="btn btn-danger" onClick={deleteProduct}>
                  {isLoading ? <SpinnerLoader /> : <><BiTrash /> Excluir produto</>}
                </button>
              }
              <button type="button" className="btn btn-primary" onClick={saveProduct} disabled={disableButton}>
                {isLoading ? <SpinnerLoader /> : <><BiSave /> Salvar produto</>}
              </button>
            </fieldset>

          </div>
        </div>
      </div>

      <div className="modal-backdrop show"></div>
    </>
  );
}
