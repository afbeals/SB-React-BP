const normalize = {
  /**
     * add comma after every three digits
     * @param {Number} num number to be converted
     * @return string
     */
    addComma : (num) => {
      if(!num) return '';
      const p = num.toString().split(".");
      p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return p.join(".");
  },
  /**
   * indexes array list by indexer (default = 'id')
   * @method arrayToIndexed
   * @param {array} array array to be indexed
   * @param {string} indexer field to use as key
   * @return {object} returns indexed list
   */
  arrayToIndexed: (array, indexer = "id") => {
    if (!array || !Array.isArray(array) || array.length < 1) return {};
    let indexedList = {},
      ar = array,
      ind = indexer;
    ar.forEach(item => {
      indexedList[item[ind]] = item;
    });
    return indexedList;
  },
  /**
   * pushed indexed obect items to array
   * @method IndexedToArray
   * @param {Object} indexedList indexed object
   * @param {object} params {sort:direction to sort list (default 'asc'),sortField: string field to sort by (default 'id')}
   * @return {array} returns new array with previously indexed objects
   */
  indexedToArray: ({ indexedList, sort = null, sortField = "id" }) => {
    if (!indexedList) return [];
    let newArr = [];
    for (let key in indexedList) {
      newArr.push(indexedList[key]);
    }
    if (sort) {
      newArr = normalize.formattedUserListSorter({
        array: newArr,
        sort,
        sortField
      });
    }
    return newArr;
  },
  /**
   * Sort function for sorting user list
   * @method formattedUserListSorter
   * @param {object} sort 'asc'||'desc' (default 'asc')
   * @param {string} sortField field to sort by (single layer deep, default 'id')
   * @return new sorted array
   */
  formattedUserListSorter: ({ array, sort = "asc", sortField = "id" }) => {
    if (!array || !Array.isArray(array)) {
      console.warn("non-array supplied to formattedUserListSorter");
      return [];
    }
    if (sort.toLowerCase() === "asc") {
      return [...array].sort((a, b) => {
        if (a[sortField] < b[sortField]) return -1;
        if (a[sortField] > b[sortField]) return 1;
        return 0;
      });
    } else {
      return [...array].sort((a, b) => {
        if (a[sortField] > b[sortField]) return -1;
        if (a[sortField] < b[sortField]) return 1;
        return 0;
      });
    }
  }
};

export default normalize;
