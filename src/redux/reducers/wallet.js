import {
  GET_CURRENCIES,
  PUT_EXPENSE,
  DELETE_EXPENSES,
  EDIT_EXPENSE,
  EDIT_EXPENSE_FINISH,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case PUT_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSES:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  case EDIT_EXPENSE:
    return { ...state, editor: true, idToEdit: action.payload };
  case EDIT_EXPENSE_FINISH:
    return {
      ...state,
      expenses: [...action.payload],
      editor: false,
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default walletReducer;
