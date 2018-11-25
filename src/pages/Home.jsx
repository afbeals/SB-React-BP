import React from "react";
import { Ledger } from "./home/";
import { ActionMenu } from "./home/";

class Home extends React.Component {
  getClassName() {
    return `home`;
  }
  render() {
    return (
      <div className={`${this.getClassName()}`}>
        <Ledger classname={`${this.getClassName()}__ledger`} />
        <ActionMenu classname={`${this.getClassName()}__actionMenu`} />
      </div>
    );
  }
}

export default Home;
