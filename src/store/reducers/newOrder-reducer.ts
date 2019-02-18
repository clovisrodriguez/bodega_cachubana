import Product from '../../interfaces/product';

export default function orderReducer(state = [], action: any): any {
  switch (action.type) {
    case '@@ORDERS/ADD_ORDER': {
      const products = action.payload.order.products;
      action.payload.order.products_quantity = products.length;
      products.map((product: Product) => {
        product.state = 'NOT_READY';
        return null;
      });
      action.payload.order.state = 0;
      return [...state, action.payload.order];
    }
    case '@@ORDER/WAITING_LIST': {
      const orderIndex = state.findIndex((order: any) => {
        return order._id === action.payload._id;
      });
      if (orderIndex === -1) {
        return [...state, action.payload];
      } else {
        return state;
      }
    }
    case '@@ORDER/PROGRESS_LIST': {
      const orderIndex = state.findIndex((order: any) => {
        return order._id === action.payload._id;
      });
      if (orderIndex === -1) {
        return state;
      } else {
        state.splice(orderIndex, 1);
        return state;
      }
    }
    case '@@ORDER/READY_LIST': {
      const orderIndex = state.findIndex((order: any) => {
        return order._id === action.payload._id;
      });
      if (orderIndex === -1) {
        return state;
      } else {
        state.splice(orderIndex, 1);
        return state;
      }
    }
    default:
      return state;
  }
}
