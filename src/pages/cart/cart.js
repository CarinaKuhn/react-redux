import './index.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  decrement,
  add,
  cartRemove,
  cartClearUpdate
} from '../../store/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Link, Redirect
} from "react-router-dom";

class Cart extends Component {
  render() {
    const notify = (message) => toast(message.split(' ').join(' '));
    let total = 0;
    const {
      id,
      cart,
      amount,
      increment,
      decrement,
      cartRemove,
      cartClearUpdate,
    } = this.props;

    if (id === 'yes') {
      notify('Livro adicionado com sucesso!');
      return <Redirect to="/cart/no" />
    }

    const totalCart = (price, amount) => {
      total += price * amount;
      return total.toFixed(2);
    }

    const subTotal = (price, amount) => {
      return (price * amount).toFixed(2);
    }

    const cartIncrement = id => {
      increment(id);
      notify('Item adicionado com sucesso!');
    }

    const cartDecrement = id => {
      decrement(id);
      notify('Carrinho atualizado com sucesso!');
    }

    const cartRemoveItem = id => {
      cartRemove(id);
      notify('Item excluído com sucesso!');
    }

    const cartClear = () => {
      cartClearUpdate();
      notify('Carrinho esvaziado com sucesso!');
    }

    const ShowCart = () => {

      return (cart.length > 1) ? cart.map((book, index) => {
        return <div key={index}>
          <div className="header-list-cart">
            <div className="cart-item"></div>
            <div style={{ textAlign: 'center' }} className="cart-item">LIVRO</div>
            <div className="cart-item">PREÇO</div>
            <div className="cart-item">QUANTIDADE</div>
            <div className="cart-item">SUBTOTAL</div>
          </div>
          <div className="items-list-cart">
            <div className="cart-item"><img src={book[0].img} width={100} height={150} alt={book[0].title} /></div>
            <div className="cart-item">{book[0].title}</div>
            <div className="cart-item">R$ {book[0].price}</div>
            <div className="cart-item">
              <div className='cart-amount'>
                <div style={{ width: '100%' }}>
                  <button onClick={() => cartDecrement(book[0].id)} className="btn-amount-cart">-</button>
                  <span>
                    {amount[book[0].id]}
                  </span>
                  <button onClick={() => cartIncrement(book[0].id)} className="btn-amount-cart">+</button>
                </div>
                <div>
                  <button onClick={() => cartRemoveItem(book[0].id)} className="btn-remove-cart">Remover</button>
                </div>
              </div>
            </div>
            <div className="cart-item">R$ {subTotal(book[0].price, amount[book[0].id])}</div>
          </div>
          <div className="footer-list-cart">
            <span>
              TOTAL R$ {totalCart(book[0].price, amount[book[0].id])}
            </span>
          </div>
        </div>
      }):<h4 style={{ marginTop: '25%', textAlign: 'center', fontSize: '20pt', }}>carrinho vazio</h4>
    }
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
        />
        <div className="container-cart">
          <header className="home-header">
            <h1>CARRINHO DE COMPRAS</h1>
            <span><Link className="link-home" to="/">HOME</Link></span>
          </header>
          <div className="list-cart">

            <button onClick={() => cartClear()} className="btn-clear-cart">Esvaziar Carrinho</button>
            {ShowCart()}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = store => ({
  cart: store.clickCart.cart,
  amount: store.clickAmount.amount,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ increment, decrement, add, cartRemove, cartClearUpdate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);