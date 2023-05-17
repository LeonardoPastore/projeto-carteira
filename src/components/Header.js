import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const initialValue = 0;

    return (
      <div>
        <p data-testid="email-field">{email}</p>

        <div data-testid="total-field">
          {expenses.length > 0
            ? expenses
              .reduce((total, expense) => {
                const { value, currency, exchangeRates } = expense;
                total += Number(exchangeRates[currency].ask) * Number(value);
                return total;
              }, 0)
              .toFixed(2)
            : initialValue.toFixed(2)}
        </div>

        <div data-testid="header-currency-field">BRL</div>

      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (globalState) => ({
  email: globalState.user.email,
  expenses: globalState.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
