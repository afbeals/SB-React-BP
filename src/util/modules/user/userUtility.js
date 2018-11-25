const userUtility = {
  /**
   * Returns initial user
   * @method buildInitialUser
   * @return {obj} returns object with initial user props
   */
  buildInitialUser: () => ({
    id: null,
    first_name: null,
    last_name: null,
    email: null
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
    user: null
  }),
  /**
   * Returns mock store
   * @method buildMockStore
   * @param {object} props addtional props insert alongside mock data.
   * @return {object} returns mock store
   */
  buildMockStore: (props = {}) => {
    return {
      ...userUtility.buildInitialStore(),
      user: {
        id: "a1",
        first_name: "Jason",
        last_name: "Bourne",
        email: "behindyou@aol.net"
      },
      props
    };
  }
};

export default userUtility;
