import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import './Select.css'

const RSelect = ({ ...props }) => {
  const {i18n}=useTranslation()
  return (
    <div className="form-control-select">
      <Select
        className={`react-select-container ${i18n.language==="ar" ? "rtl" : "ltr"} ${props.className ? props.className : ""}`}
        classNamePrefix="react-select"
        {...props}
      />
    </div>
  );
};

export default RSelect;
