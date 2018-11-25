import actionTypes from "./actionTypes";

const actions = {
  fetchLedger: userId => ({
    type: actionTypes.FETCH_REQUEST,
    payload: {
      userId
    }
  }),
  fetchLedgerFail: devMessage => ({
    type: actionTypes.FETCH_FAIL,
    payload: {
      clientMessage: "Failed to fetch Ledger",
      devMessage
    }
  }),
  fetchLedgerSuccess: ledgerList => ({
    type: actionTypes.FETCH_SUCCESS,
    payload: {
      ledgerList
    }
  }),
  addLedgerItem: item => ({
    type: actionTypes.ADD_REQUEST,
    payload: item
  }),
  addLedgerItemFail: devMessage => ({
    type: actionTypes.ADD_FAIL,
    payload: {
      clientMessage: "Failed to add item to ledger",
      devMessage
    }
  }),
  addLedgerItemSuccess: ledgerList => ({
    type: actionTypes.ADD_SUCCESS,
    payload: {
      ledgerList
    }
  }),
  clearLedgerList: () => ({
    type: actionTypes.CLEAR
  }),
  resetLegerStore: () => ({
    type: actionTypes.RESET
  })
};

export default actions;
