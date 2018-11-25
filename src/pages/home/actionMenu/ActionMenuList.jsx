import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import StyledButton from "../../../components/StyledButton";
import {actions} from "../../../modules/ledger/";
import {selectors as userSelectors} from "../../../modules/user/";
import {selectors as ledgerSelectors} from "../../../modules/ledger/";
class ActionMenuList extends React.Component {
  constructor(props,context){
    super(props,context);

    this.state = {
      values: {
        deposit: ``,
        depositDescription: ``,
        withdraw: ``,
        withdrawDescription: ``,
      }
    };
  }

  hasValidChanges(field){
    if (field === "deposit" && this.state.values.deposit.length > 2) {
      return true;
    }
    if (field === "withdraw" && this.state.values.withdraw.length > 2) {
      return true;
    }
    return false;
  }

  updateDepositDescription(val){
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        depositDescription: val.trim()
      }
    })
  }

  updateDeposit(val){
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        deposit: isNaN(parseFloat(val.replace(/[^0-9.]/g, "")).toFixed(2)) ? 0 : parseFloat(val.replace(/[^0-9.]/g, "")).toFixed(2)
      }
    })
  }

  updateWithdrawDescription(val){
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        withdrawDescription: val.trim()
      }
    })
  }

  updateWithdraw(val){
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        withdraw: isNaN(parseFloat(val.replace(/[^0-9.]/g, "")).toFixed(2)) ? 0 : parseFloat(val.replace(/[^0-9.]/g, "")).toFixed(2)
      }
    })
  }

  clearDeposit(){
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        deposit: ``,
        depositDescription: ``
      }
    })
  }

  clearWithdraw(){
    this.setState({
      ...this.state,
      values: {
        ...this.state.values,
        withdraw: ``,
        withdrawDescription: ``
      }
    })
  }
  

  render() {
    return (
      <ul className={`${this.props.classname}`}>
        <li className={`${this.props.classname}__item`}>
          <Typography
              variant={`h6`}
              className={`${this.props.classname}__item__title`}
            >
              Deposit Amount
            </Typography>
          <form noValidate autoComplete="off" className={`${this.props.classname}__item__form`}>
          
                <TextField
                  required
                  id="outlined-deposit-description"
                  label="Deposit description"
                  margin="normal"
                  variant="outlined"
                  value={this.state.values.depositDescription}
                  onChange={e => this.updateDepositDescription(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-deposit"
                  label="Deposit"
                  margin="normal"
                  variant="outlined"
                  value={this.state.values.deposit}
                  onChange={e => this.updateDeposit(e.target.value)}
                  className={`depositField`}
                />
                <StyledButton
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleAddDeposit(this.props.getUserId,this.state.values.deposit,this.state.values.depositDescription,this.props.getLedgerList);
                      this.clearDeposit();
                    }}
                    disabled={
                      !this.hasValidChanges("deposit")? true : false
                    }
                  >
                    Deposit
                  </StyledButton>
            </form>
        </li>
        <li className={`${this.props.classname}__item`}>
          <Typography
              variant={`h6`}
              className={`${this.props.classname}__item__title`}
            >
              Withdraw Amount
            </Typography>
          <form noValidate autoComplete="off" className={`${this.props.classname}__item__form`}>
          
                <TextField
                  required
                  id="outlined-withdraw-description"
                  label="Withdraw description"
                  margin="normal"
                  variant="outlined"
                  value={this.state.values.withdrawDescription}
                  onChange={e => this.updateWithdrawDescription(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-withdraw"
                  label="Withdraw"
                  margin="normal"
                  variant="outlined"
                  value={this.state.values.withdraw}
                  onChange={e => this.updateWithdraw(e.target.value)}
                  className={`withdrawField`}
                />
                <StyledButton
                    onClick={e => {
                      e.preventDefault();
                      this.props.handleAddWithdraw(this.props.getUserId,this.state.values.withdraw,this.state.values.withdrawDescription,this.props.getLedgerList);
                      this.clearWithdraw();
                    }}
                    disabled={
                      !this.hasValidChanges("withdraw")? true : false
                    }
                  >
                    Withdraw
                  </StyledButton>
            </form>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  getUserId: userSelectors.getUserId(state),
  getLedgerList: ledgerSelectors.getLedgerList(state)
});

const mapDispatchToProps = dispatch => ({
  handleAddDeposit: (userId, amount,description,ledgerList) => {
    let lastId = 0;
    [...Object.keys(ledgerList)].forEach((itemKey)=>{
      let item = ledgerList[itemKey];
      if(lastId < Number(item.id)){
        lastId = item.id
      }
    })
    dispatch(actions.addLedgerItem({
      userId,
      description,
      amount,
      type:0,
      id: `${lastId+1}`,
      date: Date.now()
    }))
  },
  handleAddWithdraw: (userId, amount,description,ledgerList) => {
    let lastId = 0;
    [...Object.keys(ledgerList)].forEach((itemKey)=>{
      let item = ledgerList[itemKey];
      if(lastId < Number(item.id)){
        lastId = item.id
      }
    })
    dispatch(actions.addLedgerItem({
      userId,
      description,
      amount,
      type:1,
      id: `${lastId+1}`,
      date: Date.now()
    }))
  }
});

ActionMenuList.propTypes = {
  handleAddDeposit: PropTypes.func.isRequired,
  handleAddWithdraw: PropTypes.func.isRequired,
  getUserId: PropTypes.string,
  getLedgerList: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionMenuList);
