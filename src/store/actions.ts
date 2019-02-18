import store from './index';
import Order from '../interfaces/order';

/*actions*/

export function updateProduct(productId: string) {
  store.dispatch({
    type: '@@ORDER/UPDATE_PRODUCT',
    payload: productId
  });
}

export function selectOrder(order: Order) {
  store.dispatch({
    type: '@@ORDER/SELECT_ORDER',
    payload: {
      order: order
    }
  });
}

export function updateOrder(order: Order) {
  let res: any = {
    type: '',
    payload: order
  };
  if (order.state === 0) {
    res.type = '@@ORDER/WAITING_LIST';
  } else if (order.state === 100) {
    res.type = '@@ORDER/READY_LIST';
  } else {
    res.type = '@@ORDER/PROGRESS_LIST';
  }
  store.dispatch(res);
}
