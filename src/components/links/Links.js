import React from "react";
import Icon from "../icon/Icon";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LinkItem = ({ ...props }) => {
  const {i18n}=useTranslation()
  return (
    <li>
      {props.tag !== "a" ? (
        <Link to={process.env.PUBLIC_URL + props.link} {...props}>
          {props.icon ? <Icon style={{marginLeft: i18n.language === "ar" ? "1rem" : "0rem"}} name={props.icon} /> : null} <span>{props.text || props.children}</span>
        </Link>
      ) : (
        <a href={process.env.PUBLIC_URL + props.link} onClick={(ev) => ev.preventDefault()}>
          {props.icon ? <Icon name={props.icon} /> : null} <span>{props.text || props.children}</span>
        </a>
      )}
    </li>
  );
};

export const LinkList = ({ ...props }) => {
  const listClasses = classNames({
    "link-list": !props.opt,
    "link-list-opt": props.opt,
    [`${props.className}`]: props.className,
  });
  return <ul className={listClasses}>{props.children}</ul>;
};
