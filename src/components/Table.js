import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenses } from '../redux/actions';

class Table extends Component {
  handleDelete = (expensesId) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenses(expensesId));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((
              {
                method,
                id,
                value,
                tag,
                description,
                currency,
                exchangeRates,
              },
            ) => (
              <tr key={ id }>
                <td>{tag}</td>
                <td>{description}</td>
                <td>{method}</td>
                <td>{exchangeRates[currency].name}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{Number(exchangeRates[currency].ask).toFixed(2)}</td>
                <td>
                  {(Number(value) * Number(exchangeRates[currency].ask)).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      description: PropTypes.string,
      currency: PropTypes.string,
      method: PropTypes.string,
      tag: PropTypes.string,
      id: PropTypes.number,
      exchangeRates: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string,
          ask: PropTypes.string,
        }),
      ),
    }),
  ),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
