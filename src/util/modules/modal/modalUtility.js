const modalUtility = {
  /**
   * Returns initial store
   * @method buildInitialStore
   * @return {object} returns object with initial store props
   */
  buildInitialStore: () => ({
    open: false,
    type: null
  }),
  /**
   * Returns mock store
   * @method buildMockStore(props={})
   * @param {object} props additional properties to be added to store
   * @return {obj} returns object with mock store props
   */
  buildMockStore: (props={}) => {
    return {
      ...modalUtility.buildInitialStore(),
      open: true,
      type: "PRINT",
      props
    };
  }
};

export default modalUtility;