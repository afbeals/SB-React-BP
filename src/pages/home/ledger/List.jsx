import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AutoSizer } from "react-virtualized";
import { Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
//Local
import {selectors} from "../../../modules/ledger/";
import { selectors as userSelectors} from "../../../modules/user/";
import { actions } from "../../../modules/ledger/";
import normalize from "../../../util/";

class List extends React.Component {
  componentDidMount() {
    this.props.handleLedgerFetch(this.props.getUser.id);
  }

  getData() {
    if (this.props.getIsLedgerLoaded) {
      return this.props.getLedgerArray;
    } else {
      return [];
    }
  }

  calculateTotals(rowIndex) {
    const data = this.getData();
    let total = 0;
    for (let x = 0; x < rowIndex + 1; x++) {
      let item = data[x];
      if (item.type) {
        total = total - Number(item.amount);
      } else {
        total = total + Number(item.amount);
      }
    }

    return `${total < 0 ? `-$${total.toString().replace("-","")}`:`$${total}`}`;
  }

  renderLedgerList() {
    if (this.props.getIsLedgerLoading) {
      return <p>loading...</p>;
    } else if (!this.props.getIsLedgerLoaded) {
      return <div className={`noContent`}>Waiting for user...</div>;
    } else if (this.props.getIsLedgerLoaded && !this.getData().length) {
      return <div className={`noContent`}>No items available</div>;
    } else {
      return (
        <AutoSizer>
          {({ width }) => (
            <Table
              width={width - 2}
              height={250}
              headerHeight={45}
              rowHeight={55}
              rowCount={this.getData().length}
              rowGetter={({ index }) => this.getData()[index]}
            >
              <Column
                label="Date"
                dataKey="date"
                width={width / 5}
                cellRenderer={({ cellData }) => {
                  return `${new Date(cellData)
                    .toUTCString()
                    .split(" ")
                    .slice(0, 4)
                    .join(" ")} ${new Date(cellData).toLocaleString(
                    "en-US",
                    { hour: "numeric", minute: "numeric", hour12: true }
                  )}`;
                }}
              />
              <Column
                width={width / 5}
                label="Description"
                dataKey="description"
              />
              <Column width={width / 5} label="Debit" dataKey="amount" cellRenderer={({ cellData,rowData }) => {
                  return `${rowData.type ? `-$${normalize.addComma(cellData)}`: ``}`;
                }}/>
              <Column width={width / 5} label="Credit" dataKey="amount" cellRenderer={({ cellData,rowData }) => {
                  return `${!rowData.type ? `$${normalize.addComma(cellData)}`: ``}`;
                }}/>
              <Column
                width={width / 5}
                disableSort
                label="Total"
                dataKey="random"
                cellRenderer={({ rowIndex }) => {
                  return normalize.addComma(this.calculateTotals(rowIndex));
                }}
                flexGrow={1}
              />
            </Table>
          )}
        </AutoSizer>
      );
    }
  }

  getClassName() {
    const { classname } = this.props;
    return `${classname}`;
  }

  render() {
    return (
      <div className={`${this.getClassName()}`}>{this.renderLedgerList()}</div>
    );
  }
}

const mapStateToProps = state => ({
  getIsLedgerLoading: selectors.getIsLedgerLoading(state),
  getIsLedgerLoaded: selectors.getIsLedgerLoaded(state),
  getLedgerList: selectors.getLedgerList(state),
  getLedgerArray: selectors.getLedgerListToArray(state),
  getUser: userSelectors.getUser(state)
});

const mapDispatchToProps = dispatch => ({
  handleLedgerFetch: userId => {
    dispatch(actions.fetchLedger(userId));
  }
});

List.propTypes = {
  getIsLedgerLoading: PropTypes.bool.isRequired,
  getIsLedgerLoaded: PropTypes.bool.isRequired,
  getLedgerList: PropTypes.object,
  getLedgerArray: PropTypes.array,
  classname: PropTypes.string
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
