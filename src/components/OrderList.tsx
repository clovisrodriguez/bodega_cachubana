import * as React from 'react';
import Order from '../interfaces/order';
import OrdersTable from './OrdersTable';

interface Iprops {
  orders: Array<Order>;
  ordersInProgress: Array<Order>;
  currentOrder: Order;
  ordersReady: Array<Order>;
}

export default class Dashboard extends React.Component<Iprops, any> {
  generateTableOrder(
    title: string,
    id: string,
    dataTarget: string,
    dataType: string,
    counter: number
  ): any {
    return (
      <div className="card" key={id}>
        <div
          className="card-header"
          id={id}
          data-toggle="collapse"
          data-target={`#${dataTarget}`}
          aria-expanded="true"
          aria-controls={dataTarget}
        >
          <h5 className="mb-0">
            <button className="btn btn-link">{title}</button>
          </h5>
          {counter > 0 ? <h5 className="counter">{counter}</h5> : <h5 />}
        </div>
        <div
          id={dataTarget}
          className="collapse"
          aria-labelledby={id}
          data-parent="#accordion"
        >
          <div className="card-body">
            <OrdersTable {...this.props} listOrder={dataType} />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container order-section">
        <div id="accordion">
          {this.generateTableOrder(
            'Ordenes por alistar',
            'one',
            'data-one',
            'waiting',
            this.props.orders.length
          )}
          {this.generateTableOrder(
            'Ordenes en progreso',
            'two',
            'data-two',
            'progress',
            this.props.ordersInProgress.length
          )}
          {this.generateTableOrder(
            'Ordenes finalizadas',
            'tree',
            'data-tree',
            'ready',
            this.props.ordersReady.length
          )}
        </div>
      </div>
    );
  }
}
