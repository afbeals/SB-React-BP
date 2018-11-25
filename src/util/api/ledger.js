import ledgerUtil from "../modules/ledger/ledgerUtility";
import ledgerData from "./data/ledger";

export const fetchLedger = ({
  request = {},
  mockProps = [],
  shouldFail = false
}) => {
  return new Promise((res, rej) => {
    window.setTimeout(() => {
      if (shouldFail) {
        return rej();
      } else {
        let newLedgerList = [];
        [...ledgerData.mock].forEach((item)=>{
          if(item.userId === request.client.id) {
            newLedgerList.push(item);
          }
        });
        return res({
          data: ledgerUtil.buildMockLedgerList(newLedgerList),
          mockRequest: request
        });
      }
    }, 1000);
  });
};
