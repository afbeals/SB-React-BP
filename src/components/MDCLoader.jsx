import React from "react";
import PropTypes from "prop-types";
import mdcUtility from "../util/components/mdcUtility";
// @MATERIAL COMPONENTS
import TextField, { HelperText, Input } from "@material/react-text-field";

import AppBar from "@material-ui/core/AppBar";

class MDCLoader extends React.Component {
  render() {
    const { component, classname } = this.props,
      componentMap = {
        TextField: TextField,
        NavBar: AppBar
      };
    return (
      <div className={`${classname ? classname : ``}MDCLoader`}>
        {[...Object.keys(componentMap)].map((comp, i) => {
          let componentName = comp || null;
          if (
            component &&
            component.toLowerCase() === componentName.toLowerCase() &&
            componentName === "TextField"
          ) {
            let MDCLL = componentMap[componentName];
            return (
              <MDCLL
                key={`${componentName}-${i}`}
                leadingIcon={this.props.leadIcon}
                label={this.props.label}
                helperText={
                  this.props.subHelpText ? (
                    <HelperText>{this.props.subHelpText}</HelperText>
                  ) : null
                }
                outlined={this.props.outlined ? this.props.outlined : null}
                textarea={this.props.textArea ? true : false}
              >
                <Input
                  pattern={this.props.pattern}
                  type={this.props.inputType}
                  onChange={this.props.onChange}
                  value={this.props.value}
                  disabled={this.props.disabled}
                  placeholder={this.props.placeholder}
                />
              </MDCLL>
            );
          } else if (
            component &&
            component.toLowerCase() === componentName.toLowerCase() &&
            componentName === "AppBar"
          ) {
            let MDCLL = componentMap[componetName];
            return <MDCLL key={`${componentName}-${i}`} {...this.props} />;
          } else if (
            component &&
            component.toLowerCase() === componentName.toLowerCase()
          ) {
            let MDCLL = componentMap[componentName];
            return <MDCLL key={`${componentName}-${i}`} {...this.props} />;
          }
        })}
      </div>
    );
  }
}

MDCLoader.propTypes = {
  outlined: PropTypes.bool,
  disabled: PropTypes.bool,
  leadIcon: PropTypes.node,
  textArea: PropTypes.bool,
  inputType: PropTypes.string,
  subHelpText: PropTypes.string,
  classname: PropTypes.string,
  placeholder: PropTypes.string,
  component: PropTypes.oneOf([...Object.values(mdcUtility.mdComponents)])
    .isRequired
};

export default MDCLoader;
