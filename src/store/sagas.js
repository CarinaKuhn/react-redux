import {all, put, select, takeLatest} from 'redux-saga/effects'
import { addSuccess, cartAmountUpdateSuccess, cartRemove, cartAmountUpdate, cartClearAmountUpdate } from '../store/actions';

const booksjson = [
    {id: 1, title: 'JavaScript - Guia Definitivo', price: 74.99, img: 'https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575222485.jpg'},
    {id: 2, title: 'A garota do lago', price: 19.90, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/198589-1200-auto?v=638070822054100000&width=1200&height=auto&aspect=true'},
    {id: 3, title: 'PHP & MySQL', price: 84.99, img: 'https://s3.novatec.com.br/capas-ampliadas/capa-ampliada-9788575225295.jpg'},
    {id: 4, title: 'É assim que começa', price: 39.90, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/169031-1200-auto?v=638018957732500000&width=1200&height=auto&aspect=true'},
    {id: 5, title: 'Mais esperto que o Diabo', price: 44.99, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/198383-1200-auto?v=638068011022030000&width=1200&height=auto&aspect=true'},
    {id: 6, title: 'Verity', price: 39.99, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/198351-1200-auto?v=638067932803730000&width=1200&height=auto&aspect=true'},
    {id: 7, title: 'Morte no internato', price: 64.89, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/199014-1200-auto?v=638073293286670000&width=1200&height=auto&aspect=true'},
    {id: 8, title: 'Trono de Vidro: Reino de Cinzas (Vol. 6)', price: 94.80, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/199009-1200-auto?v=638073291010170000&width=1200&height=auto&aspect=true'},
    {id: 9, title: 'Box Jane Austen - 3 Volumes', price: 174.99, img: 'https://lojasaraivanew.vtexassets.com/arquivos/ids/162496-1200-auto?v=638001638692170000&width=1200&height=auto&aspect=true'},
    {id: 10, title: 'Java Como Programar', price: 95.24, img: 'https://images-na.ssl-images-amazon.com/images/I/A16Dr5jlhzL.jpg'}
  ];
function* addToCart({id}) {
    const s = yield select(state => (state.clickCart.cart.map((p => {return p[0].id === id}))));

    const book = booksjson.map(book => (book.id === id) ? book : null);

    yield put(addSuccess([book[id - 1]]));
    yield put(cartAmountUpdateSuccess(id));
}

function* removeAmount({id}) {
    yield put(cartAmountUpdate(id));
}

function* cartClearUpdate() {    
    yield put(cartClearAmountUpdate());
}

export default all([
    takeLatest('add', addToCart),
    takeLatest('@cart/removeItem', removeAmount),
    takeLatest('@cart/clear', cartClearUpdate)
]);