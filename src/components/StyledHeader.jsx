import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Header = styled.h3.attrs({
  className: props => (props.classname ? props.classname : null)
})`
  font-size: 1.2rem;
  background: #863895;
  color: white;
  padding: 0.25rem;
  box-shadow: 0px 2px 2px #8a8383;
  border-radius: 1px;
`;

export default class StyledHeader extends React.Component {
  render() {
    const { title, children, classname } = this.props;
    return (
      <Header className={`${classname ? classname : ""}`}>
        {title}
        {children}
      </Header>
    );
  }
}

StyledHeader.propTypes = {
  classname: PropTypes.string
};
