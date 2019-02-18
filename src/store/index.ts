import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import data from './orders.json';
import orderReducer from './reducers/newOrder-reducer';
import ordersInProgressReducer from './reducers/orderInProgress-reducer';
import currentOrderReducer from './reducers/currentOrder-reducer';
import ordersReadyReducer from './reducers/readyOrder-reducer';

const store: any = createStore(
  combineReducers({
    orders: orderReducer,
    ordersInProgress: ordersInProgressReducer,
    ordersReady: ordersReadyReducer,
    currentOrder: currentOrderReducer
  }),
  applyMiddleware(logger)
);

/* mock of realtime action */
let timerId: any = null;
let index = 0;

function getRandom(min = 1, max = 10) {
  let result = Math.random();
  result = result * (max - min + 1) + min;
  result = Math.floor(result);
  return result * 1000;
}

function startEvent(delay: any) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    store.dispatch({
      type: '@@ORDERS/ADD_ORDER',
      payload: {
        order: data[index]
      }
    });
    if (index < data.length - 1) {
      index += 1;
      return startEvent(getRandom());
    }
    return;
  }, delay);
}

startEvent(getRandom());

export default store;
