import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpense, getCurrencies, editExpenseFinish } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    firstRunEditing: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  resetState = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { dispatch } = this.props;
    const { value, description, currency, method, tag, id } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: await this.exchangeRates(),
    };
    dispatch(addExpense(expense));

    this.resetState();
    this.setState((prevState) => ({
      id: prevState.id + 1,
    }));
  };

  editExpenseData = () => {
    const { expenses, idToEdit } = this.props;
    Object.keys(this.state)
      .forEach((key) => this.setState({ [key]: expenses[idToEdit][key] }));
    this.setState({ firstRunEditing: false });
  };

  editExpenseButton = () => {
    const { expenses, idToEdit, dispatch } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const editExpense = expenses.find((expense) => expense.id === idToEdit);
    editExpense.value = value;
    editExpense.currency = currency;
    editExpense.method = method;
    editExpense.tag = tag;
    editExpense.description = description;
    dispatch(editExpenseFinish(expenses));
    this.setState({
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      firstRunEditing: true,
    });
  };

  exchangeRates = async () => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { value, currency, method, tag, description, firstRunEditing } = this.state;
    const { currencies, editor } = this.props;
    if (editor && firstRunEditing) { this.editExpenseData(); }
    return (
      <form>

        <label htmlFor="value">
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            id="value"
          />
        </label>

        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {currencies.map((coin) => (
              <option value={ coin } key={ coin }>
                {coin}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Descrição"
            id="description"
          />
        </label>
        {
          editor
            ? (
              <button
                type="button"
                onClick={ () => this.editExpenseButton() }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                type="button"
                onClick={ () => this.handleClick() }
              >
                Adicionar despesa
              </button>
            )
        }
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      currency: PropTypes.string.isRequired,
      method: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    }),
  ).isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
