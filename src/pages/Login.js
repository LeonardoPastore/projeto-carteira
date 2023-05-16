import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  validateEmail = () => {
    const { email } = this.state;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    console.log(email);
    return isEmailValid;
  };

  validatePassword = () => {
    const { password } = this.state;
    const minLength = 6;
    const isPasswordValid = password.length >= minLength;
    console.log(password);
    return isPasswordValid;
  };

  fieldsValidation = () => this.validateEmail() && this.validatePassword();

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.setState({
      isDisabled: !this.fieldsValidation(),
    }));
  };

  handleClick = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <section>
        <input
          type="email"
          name="email"
          value={ email }
          onChange={ this.handleChange }
          id="email"
          placeholder="Email"
          data-testid="email-input"
        />
        <input
          type="password"
          name="password"
          value={ password }
          onChange={ this.handleChange }
          id="password"
          placeholder="Senha"
          data-testid="password-input"
        />

        <button type="button" disabled={ isDisabled } onClick={ this.handleClick }>
          Entrar
        </button>
      </section>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
