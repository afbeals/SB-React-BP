import ledgerData from "./../../api/data/ledger";
import normalize from "../../normalize";

const ledgerUtility = {
  /**
   * Returns initial ledgerItem
   * @method buildInitialLedger
   * @return {obj} returns object with initial ledger props
   */
  buildInitialLedger: () => ({
    id: null,
    date: null,
    description: null,
    debit: null,
    credit: null
  }),
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {obj} returns object with initial store props
   */
  buildInitialStore: () => ({
    error: null,
    isLoading: false,
    isLoaded: false,
    isUpdating: false,
    isUpdated: false,
    ledgerList: null
  }),
  /**
   * Returns mock ledger List
   * @method buildMockLedgerList
   * @param {object} props addtional props insert alongside mock data.
   * @return {obj} returns mock list
   */
  buildMockLedgerList: (props) => {
    const mockLedger = props ? props : [...ledgerData.mock];
    return mockLedger;
  },
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} props addtional props insert alongside mock data.
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => {
    return {
      ...ledgerUtility.buildInitialStore(),
      ledgerList: normalize.arrayToIndexed(ledgerUtility.buildMockLedgerList()),
      props
    };
  }
};

export default ledgerUtility;
