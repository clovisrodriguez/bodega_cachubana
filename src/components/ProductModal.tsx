import * as React from 'react';
import { updateProduct, updateOrder } from '../store/actions';
import { connect } from 'react-redux';

class ProductModal extends React.Component<any> {
  state = {
    order: this.props.currentOrder
  };

  triggerCloseModal() {
    this.props.closeModal();
    updateOrder(this.state.order);
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.currentOrder !== state.order) {
      return {
        order: props.currentOrder
      };
    }
    return null;
  }

  render() {
    const elements = [];

    for (let value of this.state.order.products) {
      elements.push(
        <div
          className={value.state !== 'READY' ? 'product' : 'product ready'}
          key={value._id}
          title="¿Está listo el producto?"
          onClick={() => updateProduct(value._id)}
        >
          <h5>{value.name}</h5>
          <label>
            <p>Cantidad: {value.quantity}</p>
          </label>
        </div>
      );
    }
    return (
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="order-id">
                <h5>{this.state.order._id}</h5>
              </div>
              <div className="description">
                <h5>Productos</h5>
                <label className="label">
                  Numero de productos:{this.state.order.products_quantity}
                  <br />
                  Progreso: {this.state.order.state.toFixed(1)}
                </label>
              </div>
            </div>
            <div className="modal-body">{elements}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.triggerCloseModal.bind(this)}
              >
                ¡Listo!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  currentOrder: state.currentOrder
});

export default connect(mapStateToProps)(ProductModal);
