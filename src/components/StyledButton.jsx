import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button.attrs({
  id: props => (props.id ? props.id : null)
})`
  background: #ffffff;
  border: 2px solid #1564bf;
  padding: 0.51rem 0.8rem;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  cursor: pointer;
  font-size: 1.15rem;
  transition: all 0.5s;
  &:hover {
    background: #5e91f2;
    border: 2px solid #5e91f2;
    color: #efefef;
  }
  &:active {
    box-shadow: none;
  }
  &:focus {
    outline: 0;
  }
`;

const DangerButton = styled(Button)`
  border: 2px solid #d23f2f;
  &:hover {
    background: #ff6659;
    border: 2px solid #ff6659;
    color: #ffffff;
  }
`;
export default class StyledButton extends React.Component {
  render() {
    const { type, disabled, onClick, children } = this.props;
    switch (type) {
      case "danger":
        return (
          <DangerButton disabled={disabled} onClick={onClick}>
            {children}
          </DangerButton>
        );
      default:
        return (
          <Button disabled={disabled} onClick={onClick}>
            {children}
          </Button>
        );
    }
  }
}

StyledButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string
};
