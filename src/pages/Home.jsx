import React from "react";

class Home extends React.Component {
  getClassName() {
    return `home`;
  }
  render() {
    return (
      <div className={`${this.getClassName()}`}>
        Welcome Home
      </div>
    );
  }
}

export default Home;
