import './index.css';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { add } from '../../store/actions';
import Logo from '../../assets/booklstorelogop.png'

import {
  Link, Redirect
} from "react-router-dom";

class Home extends Component {
  state = {
    redirect: null
  }

  render() {
  
    const booksjson = [
      { id: 1, title: 'JavaScript - Guia Definitivo', price: 74.99, img: 'https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575222485.jpg' },
      { id: 2, title: 'A garota do lago', price: 19.90, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/198589-1200-auto?v=638070822054100000&width=1200&height=auto&aspect=true' },
      { id: 3, title: 'PHP & MySQL', price: 84.99, img: 'https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575225295.jpg' },
      { id: 4, title: 'É assim que começa', price: 39.90, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/169031-1200-auto?v=638018957732500000&width=1200&height=auto&aspect=true' },
      { id: 5, title: 'Mais esperto que o Diabo', price: 44.99, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/198383-1200-auto?v=638068011022030000&width=1200&height=auto&aspect=true' },
      { id: 6, title: 'Verity', price: 39.99, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/198351-1200-auto?v=638067932803730000&width=1200&height=auto&aspect=true' },
      { id: 7, title: 'Morte no internato', price: 64.89, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/199014-1200-auto?v=638073293286670000&width=1200&height=auto&aspect=true' },
      { id: 8, title: 'Trono de Vidro: Reino de Cinzas (Vol. 6)', price: 94.80, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/199009-1200-auto?v=638073291010170000&width=1200&height=auto&aspect=true' },
      { id: 9, title: 'Box Jane Austen - 3 Volumes', price: 174.99, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/162496-1200-auto?v=638001638692170000&width=1200&height=auto&aspect=true' },
      { id: 10, title: 'Java Como Programar', price: 95.24, img: 'https://images-na.ssl-images-amazon.com/images/I/A16Dr5jlhzL.jpg' }
    ];
    const {
      add,
      cart,
      amount,
    } = this.props;

    const addBook = book => {
      add(book);
      this.setState({
        redirect: 'clicked'
      });
    }

    if (this.state.redirect !== null)
      return <Redirect to="/cart/yes" />

    return (
      <>
        <div className="container-home">
          <header className="home-header">
            <div className='home-menu'>
              <div>
                <img className='home-menu__logo' src={Logo} alt='BookStore logo' />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span>
                  <Link className="link-cart" to="/cart/no">IR PARA O CARRINHO</Link>
                </span>

              </div>
            </div>
          </header>
          <main>
            <div>
              <h1>PRODUTOS</h1>
            </div>
            <div className="list-books">
              {booksjson.map((book, index) =>

                <div className="list-row" key={index} >
                  <p><img src={book.img} width={150} height={200} alt="" /></p>
                  <p>{book.title}</p>
                  <p>R$ {book.price}</p>
                  <p>
                    <button className="list-button" onClick={() => addBook(book.id)}>
                      <span className='cart-counter'>{(amount[book.id] > 0) ? amount[book.id] : 0}</span>
                      <span style={{ padding: '10px' }}>Adicionar ao Carrinho</span>
                    </button>
                  </p>
                </div>
              )}
            </div>
          </main>
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
  bindActionCreators({ add }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);