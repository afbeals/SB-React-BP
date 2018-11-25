import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getClassName = () => {
  return `toolTip`;
};

const ToolTipWrapper = styled.div.attrs({
  className: props =>
    props.className
      ? `${props.className} ${getClassName()}`
      : `${getClassName()}`
})`
  position: relative;
  &:hover {
    .${getClassName()}__message {
      animation: fadeInOut-element-slow 3s forwards;
    }
  }
`;

const ToolTipMessage = styled.div.attrs({
  className: props =>
    props.className
      ? `${props.className} ${getClassName()}__message`
      : `${getClassName()}__message`
})`
  position: absolute;
  background: #3d3d3d;
  border-radius: 5px;
  text-transform: capitalize;
  padding: 0.5rem 0.5rem;
  font-size: 0.75rem;
  white-space: nowrap;
  //transform: translateX(-15%);
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  opacity: 0;
  color: #fff;
  z-index: 1;
`;

class ToolTip extends React.Component {
  render() {
    const { displayWhen, tip } = this.props;
    return (
      <ToolTipWrapper>
        {this.props.children}
        {displayWhen && <ToolTipMessage>{tip}</ToolTipMessage>}
      </ToolTipWrapper>
    );
  }
}

ToolTip.propTypes = {
  tip: PropTypes.string.isRequired,
  displayWhen: PropTypes.bool.isRequired
};

export default ToolTip;
