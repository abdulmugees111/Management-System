import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const RSelect = ({ ...props }) => {
  const {i18n}=useTranslation()
  return (
    <div className="form-control-select">
      <Select
        className={`react-select-container ${props.className ? props.className : ""}`}
        classNamePrefix="react-select"
        {...props}
      />
    </div>
  );
};

export default RSelect;
