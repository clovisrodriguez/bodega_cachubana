import Order from '../../interfaces/order';

export default function currentOrderReducer(
  state: Order = {
    _id: '',
    user: { name: '' },
    slot: '',
    region_code: '',
    products: [],
    routeId: ''
  },
  action: any
): any {
  switch (action.type) {
    case '@@ORDER/SELECT_ORDER': {
      return action.payload.order;
    }
    case '@@ORDER/UPDATE_PRODUCT': {
      const prodIndex = state.products.findIndex(product => {
        return product._id === action.payload;
      });
      state.products[prodIndex].state = 'READY';
      let progress = 0;
      state.products.map(prod => {
        if (prod.state === 'READY') {
          progress++;
        }
      });
      if (state.products_quantity) {
        state.state = (progress / state.products_quantity) * 100;
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
