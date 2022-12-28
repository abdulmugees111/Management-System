import React from "react";

import { useTranslation } from "react-i18next";
import enImg from "../../assets/images/en.png";
import switchStyles from './languageSwitcher.module.css'

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className={switchStyles.container}>
      <select className={switchStyles.select} value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option className={switchStyles.option} value="en">
        🇬🇧&emsp;English
        </option>

        <option className={switchStyles.option} value="ar">🇸🇦&emsp;عربي</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
