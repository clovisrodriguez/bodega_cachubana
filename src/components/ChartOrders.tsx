import * as React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from 'recharts';
import Order from '../interfaces/order';

interface Iprops {
  orders: Array<Order>;
  ordersInProgress: Array<Order>;
  ordersReady: Array<Order>;
}

interface Istate {
  title: string;
  type: string;
  graphic: string;
  gType: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active) {
    const info = payload[0].payload;
    return (
      <div className="blockquote">
        <p className="lead">
          nombre: {info.name}
          <br />
          Cantidad de Ordenes: {info.count}
          <br />
          Porcentaje de pedidos:
          {`% ${Math.round(info.percentage * 100) / 100}`}
        </p>
      </div>
    );
  }
  return null;
};

export default class ChartOrders extends React.Component<Iprops, Istate> {
  constructor(props: any) {
    super(props);
    this.getRoutesPercentage = this.getRoutesPercentage.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.changeData = this.changeData.bind(this);
    this.selectData = this.selectData.bind(this);
    this.state = {
      title: 'Ordenes en alistamiento',
      type: 'waitingOrders',
      graphic: 'Gráfico de ruta',
      gType: 'route'
    };
  }

  getRoutesPercentage(data: Array<Order>) {
    let arr: Array<any> = [];
    data.map(order => {
      if (arr.length === 0) {
        arr = [{ name: order.routeId, count: 1, percentage: 100 }];
      } else {
        const index = arr.findIndex(route => route.name === order.routeId);
        if (index !== -1) {
          arr[index].count++;
          arr.map(value => {
            value.percentage = (value.count / data.length) * 100;
            return null;
          });
        } else {
          arr = [...arr, { name: order.routeId, count: 1 }];
          arr.map(value => {
            value.percentage = (value.count / data.length) * 100;
            return null;
          });
        }
      }
      return null;
    });
    return arr;
  }

  getSlotPercentage(data: Array<Order>) {
    let arr: Array<any> = [];
    data.map(order => {
      if (arr.length === 0) {
        arr = [{ name: order.slot, count: 1, percentage: 100 }];
      } else {
        const index = arr.findIndex(slot => slot.name === order.slot);
        if (index !== -1) {
          arr[index].count++;
          arr.map(value => {
            value.percentage = (value.count / data.length) * 100;
            return null;
          });
        } else {
          arr = [...arr, { name: order.slot, count: 1 }];
          arr.map(value => {
            value.percentage = (value.count / data.length) * 100;
            return null;
          });
        }
      }
      return null;
    });
    return arr;
  }

  getRegionPercentage(data: Array<Order>) {
    let arr: Array<any> = [];
    data.map(order => {
      if (arr.length === 0) {
        arr = [{ name: order.region_code, count: 1, percentage: 100 }];
      } else {
        const index = arr.findIndex(
          region_code => region_code.name === order.region_code
        );
        if (index !== -1) {
          arr[index].count++;
          arr.map(value => {
            value.percentage = (value.count / data.length) * 100;
            return null;
          });
        } else {
          arr = [...arr, { name: order.region_code, count: 1 }];
          arr.map(value => {
            value.percentage = (value.count / data.length) * 100;
            return null;
          });
        }
      }
      return null;
    });
    return arr;
  }

  renderChart(data: Array<any>) {
    const routes = this.getRoutesPercentage(data);
    const slot = this.getSlotPercentage(data);
    const region = this.getRegionPercentage(data);
    let percentage: Array<Order> = [];
    if (this.state.gType === 'slot') {
      percentage = slot;
    } else if (this.state.gType === 'region') {
      percentage = region;
    } else {
      percentage = routes;
    }
    if (percentage.length > 0) {
      return (
        <BarChart width={730} height={250} data={percentage}>
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="percentage" fill="#a4ac24" />
        </BarChart>
      );
    } else {
      return <h4>Información no disponible</h4>;
    }
  }

  changeData(type: string): any {
    let newTitle: string;
    if (type === 'ordersInProgress') {
      newTitle = 'Ordenes en progreso';
    } else if (type === 'ordersReady') {
      newTitle = 'Ordenes finalizadas';
    } else {
      newTitle = 'Ordenes en alistamiento';
    }
    this.setState({
      title: newTitle,
      type: type
    });
  }

  selectData(): any {
    if (this.state.type === 'ordersInProgress') {
      return this.renderChart(this.props.ordersInProgress);
    } else if (this.state.type === 'ordersReady') {
      return this.renderChart(this.props.ordersReady);
    } else {
      return this.renderChart(this.props.orders);
    }
  }

  selectGraphic(type: string): any {
    let newTitle: string;
    if (type === 'region') {
      newTitle = 'Gráfico de región';
    } else if (type === 'slot') {
      newTitle = 'Gráfico de tiempo';
    } else {
      newTitle = 'Gráfico de ruta';
    }
    this.setState({
      graphic: newTitle,
      gType: type
    });
  }

  render() {
    return (
      <div className="container chart">
        <div className="row">
          <div className="col-12 counter">
            <h4>
              {this.state.title}:{' '}
              {this.state.type === 'ordersInProgress'
                ? this.props.ordersInProgress.length
                : this.state.type === 'ordersReady'
                ? this.props.ordersReady.length
                : this.props.orders.length}
            </h4>
            <div
              className="chart-buttons btn-group btn-group-toggle"
              data-toggle="buttons"
            >
              <label
                className="btn btn-primary active"
                onClick={() => this.changeData('waitingOrders')}
              >
                <input type="radio" name="options" id="1" />
                Alistamiento
              </label>
              <label
                className="btn btn-primary"
                onClick={() => this.changeData('ordersInProgress')}
              >
                <input type="radio" name="options" id="2" />
                En Progreso
              </label>
              <label
                className="btn btn-primary"
                onClick={() => this.changeData('ordersReady')}
              >
                <input type="radio" name="options" id="3" />
                Finalizadas
              </label>
            </div>
          </div>
          <div className="col-12 chart-space">{this.selectData()}</div>
          <div className="col-12 counter">
            <div>
              <h5>{this.state.graphic}</h5>
            </div>
            <div
              className="chart-buttons btn-group btn-group-toggle"
              data-toggle="buttons"
            >
              <label
                className="btn btn-primary active"
                onClick={() => this.selectGraphic('route')}
              >
                <input type="radio" name="options" id="1" />
                Ruta
              </label>
              <label
                className="btn btn-primary"
                onClick={() => this.selectGraphic('slot')}
              >
                <input type="radio" name="options" id="2" />
                Tiempo
              </label>
              <label
                className="btn btn-primary"
                onClick={() => this.selectGraphic('region')}
              >
                <input type="radio" name="options" id="3" />
                Región
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
