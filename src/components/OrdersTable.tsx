import * as React from 'react';
import ProductModal from './ProductModal';
import Order from '../interfaces/order';
import { CSSTransition } from 'react-transition-group';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';
import { selectOrder } from '../store/actions';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

interface Iprops {
  orders: Array<Order>;
  ordersInProgress: Array<Order>;
  listOrder: string;
  ordersReady: Array<Order>;
}

export default class OrdersTable extends React.Component<Iprops, {}> {
  state = { show: false };

  closeModal() {
    this.setState({ show: false });
  }

  selectData(data1: any, data2: any, data3: any) {
    if (this.props.listOrder === 'waiting') {
      return data1;
    } else if (this.props.listOrder === 'progress') {
      return data2;
    } else {
      return data3;
    }
  }

  render() {
    function stateFormatter(cell: any, row: any) {
      return <span>{`% ${cell.toFixed(1)}`}</span>;
    }
    const rowEvents = {
      onClick: (e: any, row: any) => {
        this.setState({ show: true });
        selectOrder(row);
      }
    };
    const columns = [
      {
        dataField: '_id',
        text: 'ID del pedido',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'user.name',
        text: 'Usuario',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'region_code',
        text: 'Región',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'routeId',
        text: 'Ruta',
        sort: true,
        filter: textFilter()
      },
      {
        dataField: 'slot',
        text: 'Horario de entrega',
        sort: true
      },
      {
        dataField: 'products_quantity',
        text: 'Cantidad de Productos',
        sort: true
      },
      {
        dataField: 'state',
        text: 'Estado de la orden',
        formatter: stateFormatter
      }
    ];
    const defaultSorted = [
      {
        dataField: 'slot',
        order: 'desc'
      }
    ];
    const { orders } = this.props;
    const { ordersInProgress } = this.props;
    const { ordersReady } = this.props;
    return (
      <div>
        <div className="container table">
          <BootstrapTable
            keyField="_id"
            columns={columns}
            data={this.selectData(orders, ordersInProgress, ordersReady)}
            rowEvents={rowEvents}
            pagination={paginationFactory({
              sizePerPageList: [
                {
                  text: '5',
                  value: 5
                },
                {
                  text: '10',
                  value: 10
                }
              ]
            })}
            defaultSorted={defaultSorted}
            filter={filterFactory()}
            classes="frubana-table"
          />
        </div>
        {this.state.show ? (
          <CSSTransition
            in={this.state.show}
            appear={true}
            timeout={600}
            classNames="fade"
          >
            <ProductModal
              {...this.state}
              closeModal={this.closeModal.bind(this)}
            />
          </CSSTransition>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
