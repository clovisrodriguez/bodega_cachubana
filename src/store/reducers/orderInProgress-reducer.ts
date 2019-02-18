export default function ordersReadyReducer(state = [], action: any): any {
  switch (action.type) {
    case '@@ORDER/PROGRESS_LIST': {
      const orderIndex = state.findIndex((order: any) => {
        return order._id === action.payload._id;
      });
      if (orderIndex === -1) {
        return [...state, action.payload];
      } else {
        return state;
      }
    }
    case '@@ORDER/WAITING_LIST': {
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
