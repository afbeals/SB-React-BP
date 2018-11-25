import React from "react";
import StyledHeader from "../../../components/StyledHeader";

const LedgerHeader = ({ classname }) => (
  <StyledHeader className={`${classname}`} title={`Ledger`} />
);

export default LedgerHeader;
