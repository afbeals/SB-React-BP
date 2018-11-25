//Packages
import React from "react";
import { connect } from "react-redux";

//Local
import ActionMenuHeader from "./actionMenu/ActionMenuHeader";
import ActionMenuList from "./actionMenu/ActionMenuList";

class ActionMenu extends React.Component {

  render() {
    return (
      <div className={`${this.props.classname}`}>
        <ActionMenuHeader classname={`${this.props.classname}__header`} />
        <ActionMenuList classname={`${this.props.classname}__list`} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionMenu);
