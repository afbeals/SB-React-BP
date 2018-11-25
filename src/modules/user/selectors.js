import { createSelector } from "reselect";

export const getRootStore = store => store.user;

export const getUserStore = createSelector(
  [getRootStore],
  rootStore => rootStore
);

export const getUserError = createSelector(
  [getRootStore],
  rootStore => rootStore.error
);

export const getIsUserLoading = createSelector(
  [getRootStore],
  rootStore => rootStore.isLoading
);

export const getIsUserLoaded = createSelector(
  [getRootStore],
  rootStore => rootStore.isLoaded
);

export const getUser = createSelector(
  [getRootStore],
  rootStore => rootStore.user
);

export const getUserId = createSelector(
  [getUser],
  user => user.id
)