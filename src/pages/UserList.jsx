//Packages
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Local
import Header from "./userList/Header";
import List from "./userList/List";
import Search from "./userList/Search";
import * as selectors from "../modules/users/selectors";
import actions from "../modules/users/actions";

class UserList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      filteredList: null
    };

    this.filterList = this.filterList.bind(this);
    this.resetList = this.resetList.bind(this);
  }

  filterList(reqQuery) {
    const { getUserListInArray } = this.props;
    let query = reqQuery.toLowerCase(),
      filteredList = [];

    if (!query.length) {
      this.setState({ ...this.state, filteredList: null });
      return;
    }

    [...getUserListInArray].forEach(user => {
      if (
        user.first_name.toLowerCase().startsWith(query) ||
        user.last_name.toLowerCase().startsWith(query)
      ) {
        filteredList.push(user);
      }
    });

    this.setState({ ...this.state, filteredList });
  }

  resetList() {
    this.setState(
      {
        ...this.state, 
        filteredList: null
      }
    );
  }

  getClassName() {
    return `userList`;
  }

  render() {
    const { getUserListInArray, getIsUserLoaded } = this.props;
    const { filteredList } = this.state;
    return (
      <div
        className={`${this.getClassName()} ${filteredList ? "filtered" : ""}`}
      >
        <Header
          currentAmount={
            filteredList && filteredList.length
              ? filteredList.length
              : getUserListInArray.length
          }
          contentLoaded={getIsUserLoaded}
          classname={`${this.getClassName()}__header`}
        />
        <Search
          classname={`${this.getClassName()}__search`}
          filterList={this.filterList}
          resetList={this.resetList}
        />
        <List
          filteredList={this.state.filteredList}
          classname={`${this.getClassName()}`}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  getUserState: selectors.getUserState(state),
  getUserError: selectors.getUserError(state),
  getIsUserLoading: selectors.getIsUserLoading(state),
  getIsUserLoaded: selectors.getIsUserLoaded(state),
  getSelectedUserId: selectors.getSelectedUserId(state),
  getUserList: selectors.getUserList(state),
  getSelectedUser: selectors.getSelectedUser(state),
  getUserListInArray: selectors.getUserListInArray(state),
  getstate: state
});

const mapDispatchToProps = dispatch => ({
  handleFetchUser: () => {
    dispatch(actions.fetchUserList());
  },
  handleSelectdUser: selectedId => {
    dispatch(actions.handleSelectUser(selectedId));
  },
  handleClearSelectedUser: () => {
    dispatch(actions.clearSelectedUser());
  },
  handleClearUserList: () => {
    dispatch(actions.clearUserList());
  },
  handleRestStore: () => {
    dispatch(actions.resetStore());
  }
});

UserList.propTypes = {
  getUserError: PropTypes.string,
  getIsUserLoading: PropTypes.bool.isRequired,
  getIsUserLoaded: PropTypes.bool.isRequired,
  getSelectedUserId: PropTypes.number,
  getUserList: PropTypes.object,
  getUserListInArray: PropTypes.array,
  getSelectedUser: PropTypes.object,
  handleFetchUser: PropTypes.func,
  handleSelectdUser: PropTypes.func.isRequired,
  handleClearSelectedUser: PropTypes.func.isRequired,
  handleClearUserList: PropTypes.func.isRequired,
  handleRestStore: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
