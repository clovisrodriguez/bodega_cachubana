import * as React from 'react';
import { connect } from 'react-redux';

import Navbar from '../components/Navbar';
import ChartOrders from '../components/ChartOrders';
import OrderList from '../components/OrderList';
import Order from '../interfaces/order';

interface Iprops {
  orders: Array<Order>;
  currentOrder: Order;
  ordersInProgress: Array<Order>;
  ordersReady: Array<Order>;
}

class Dashboard extends React.Component<Iprops> {
  render() {
    return (
      <div>
        <Navbar />
        <ChartOrders {...this.props} />
        <OrderList {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  orders: state.orders,
  ordersInProgress: state.ordersInProgress,
  currentOrder: state.currentOrder,
  ordersReady: state.ordersReady
});
export default connect(mapStateToProps)(Dashboard);
