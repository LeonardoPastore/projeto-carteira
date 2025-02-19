export const SAVE_EMAIL = 'SAVE_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const PUT_EXPENSE = 'PUT_EXPENSE';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const EDIT_EXPENSE_FINISH = 'EDIT_EXPENSE_FINISH';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

const loadCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const addExpense = (expense) => ({
  type: PUT_EXPENSE,
  payload: expense,
});

export const deleteExpenses = (expenses) => ({
  type: DELETE_EXPENSES,
  payload: expenses,
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const editExpenseFinish = (expen) => ({
  type: EDIT_EXPENSE_FINISH,
  payload: expen,
});

export const getCurrencies = () => async (dispatch) => {
  const response = await
  fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currenciesFilter = Object.keys(data).filter((coin) => coin !== 'USDT');
  dispatch(loadCurrencies(currenciesFilter));
};
