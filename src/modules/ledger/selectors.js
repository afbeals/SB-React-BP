import { createSelector } from "reselect";
import normalize from "../../util/normalize";

export const getRootStore = store => store.ledger;

export const getLedgerStore = createSelector(
  [getRootStore],
  rootStore => rootStore
);

export const getLedgerError = createSelector(
  [getRootStore],
  rootStore => rootStore.error
);

export const getIsLedgerLoading = createSelector(
  [getRootStore],
  rootStore => rootStore.isLoading
);

export const getIsLedgerLoaded = createSelector(
  [getRootStore],
  rootStore => rootStore.isLoaded
);

export const getIsLedgerUpdating = createSelector(
  [getRootStore],
  rootStore => rootStore.isUpdating
);

export const getIsLedgerUpdated = createSelector(
  [getRootStore],
  rootStore => rootStore.isUpdated
);

export const getLedgerList = createSelector(
  [getRootStore],
  rootStore => rootStore.ledgerList
);

export const getLedgerListToArray = createSelector(
  [getLedgerList],
  ledgerList =>
    normalize.indexedToArray({
      indexedList: ledgerList,
      sort: "asc",
      sortField: "id"
    })
);
