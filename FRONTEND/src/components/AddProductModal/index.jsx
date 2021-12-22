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
  const { currentEditingProduct: productData, setCurrentEditingProduct, setProducts, setShowAddProductModal, toast } = useMainContext();
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
    window.location.hash = 'modal-open';

    function hashChange() {
      if (window.location.hash === '') hideModal();
    }
    window.addEventListener('hashchange', hashChange);
    return () => {
      window.location.hash = '';
      window.removeEventListener('hashchange', hashChange);
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

  function moveCursorToEnd(e){
    const len = e.target.value.length;
    e.target.setSelectionRange(len, len);
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
    } else if (e.keyCode === 8 || e.keyCode === 46 || e.keyCode === 229) { // backspace or delete
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
          toast.error(`Ocorreu um erro ao deletar "${productData.name}"`);
          console.log(resp.data.error);

        } else if (resp.data.ok) {
          setProducts(products => products.filter(product =>
            product.id !== productData.id
          ));
          hideModal();
        }
      })
      .catch(error => {
        toast.error('Erro no envio de informações.')
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  }


  function saveProduct() {
    const rawPrice = price.replace(/[^\d]/g, '') / 100;

    if (name.length < 3 || name.length > 30) {
      toast.error('Por favor, o nome deve conter entre 3 e 30 caracteres.');
      return;

    } else if (rawPrice == 0) { // eslint-disable-line
      toast.error('O preço precisa ser maior que zero.');
      return;

    } else if (category.length < 3 || category.length > 30) {
      toast.error('Por favor, a categoria deve conter entre 3 e 30 caracteres.');
      return;

    } else if (Number(amount) < 1) {
      toast.error('Por favor, insira ao menos uma quantidade.');
      return;
    }

    setIsLoading(true);

    function success(resp) {
      if (resp.data.error) {
        toast.error('Ocorreu um erro: ' + resp.data.error);
      } else if (resp.data.ok) {
        toast.success('Produto editado com sucesso!');
        hideModal();
        setProducts(products => products.map(product =>
          product.id === productData.id
            ? { ...productData, name, price: rawPrice, amount, category, perishable }
            : product
        ))

      } else {
        toast.success('Produto cadastrado com sucesso.');
        hideModal();
        setProducts(products => [...products, resp.data]);
      }

      const categoriesHistory = localStorage.categoriesHistory ? JSON.parse(localStorage.categoriesHistory) : [];
      categoriesHistory.includes(category.toLowerCase()) || categoriesHistory.push(category.toLowerCase())
      localStorage.categoriesHistory = JSON.stringify(categoriesHistory);
    }


    api.request({
      method: productData ? 'put' : 'post',
      url: '/products' + (productData ? `/${productData.id}` : ''),
      data: { name, price: rawPrice, amount, category, perishable }

    })
      .then(success)
      .catch(error => {
        toast.error('Algo deu errado... Consulte o console.');
        console.log(error);

      })
      .finally(() => setIsLoading(false))
  }



  return (
    <>
      <div id="add-product-modal" className="modal show d-block" tabIndex="-1" onClick={hideModal}>
        <div className="modal-dialog modal-dialog-centered" onClick={e => e.stopPropagation()}>
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
                onBlur={() => setName(name => name.trim())}
              />

              <label className="form-label mt-4"><Price /> Preço</label>
              <input
                type="tel"
                className="form-control"
                placeholder="Insira o preço do produto"
                maxLength="15"
                value={price}
                onKeyDown={priceValidator}
                onChange={() => { }}
                onFocus={moveCursorToEnd}
                onClick={moveCursorToEnd}
                onKeyUp={moveCursorToEnd}
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
                list="categories-history"
                className="form-control text-lowercase"
                maxLength="30"
                placeholder="Digite a categoria do produto"
                value={category}
                onChange={e => setCategory(e.target.value)}
                onBlur={() => setCategory(category => category.trim())}
              />
              <datalist id="categories-history">
                {localStorage.categoriesHistory && JSON.parse(localStorage.categoriesHistory).map(category =>
                  <option key={category}>{category}</option>
                )}
              </datalist>

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
                  {isLoading ? <SpinnerLoader /> : <><BiTrash /> Excluir</>}
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
