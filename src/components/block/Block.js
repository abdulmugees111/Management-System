import React from "react";
import Icon from "../icon/Icon";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Block = ({ className, size, ...props }) => {
  const blockClass = classNames({
    "nk-block": true,
    [`nk-block-${size}`]: size,
    [`${className}`]: className,
  });
  return <div className={blockClass}>{props.children}</div>;
};
export const BlockContent = ({ className, ...props }) => {
  const blockContentClass = classNames({
    "nk-block-content": true,
    [`${className}`]: className,
  });
  return <div className={blockContentClass}>{props.children}</div>;
};

export const BlockBetween = ({ className, ...props }) => {
  return <div className={`nk-block-between ${className ? className : ""}`}>{props.children}</div>;
};
export const BlockHead = ({ className, size, wide, ...props }) => {
  const blockHeadClass = classNames({
    "nk-block-head": true,
    [`nk-block-head-${size}`]: size,
    [`wide-${wide}`]: wide,
    [`${className}`]: className,
  });
  return <div className={blockHeadClass} {...props}>{props.children}</div>;
};
export const BlockHeadContent = ({ className, ...props }) => {
  return <div {...props}className={[`nk-block-head-content${className ? " " + className : ""}`]}>{props.children}</div>;
};
export const BlockTitle = ({ className, page, ...props }) => {
  const classes = [`nk-block-title ${page ? "page-title" : "title"}${className ? " " + className : ""}`];
//  const buttonStyles = {
//   marginLeft: '80%',  // Set the left margin
//   position: 'absolute',
//   }
  return (
    <React.Fragment>
    {/*props.children=="Payment History"?(
      <a
      style={buttonStyles}
      href="#toggle"
      onClick={(ev) => ev.preventDefault()}
      className="btn btn-primary btn-dim d-none d-sm-inline-flex"
    >Create Invoice +</a>):(<h1></h1>)
    */}
      {!props.tag ? (
        <h3 className={classes} {...props}>{props.children}</h3>
      ) : (
        <props.tag className={classes} {...props}>{props.children}</props.tag>
      )}
      {/*add */}
     
      
          </React.Fragment>
  );
};
export const BlockDes = ({ className, page, ...props }) => {
  const classes = [`nk-block-des${className ? " " + className : ""}`];
  return <div className={classes}>{props.children}</div>;
};

export const BackTo = ({ className, link, icon, ...props }) => {
  const { i18n } = useTranslation()
  const classes = [`back-to${className ? " " + className : ""}`];
  return (
    <div className="nk-block-head-sub">
      <Link style={{display:"flex",flexDirection:i18n.language==="ar"?"row-reverse":"row"}} className={classes} to={process.env.PUBLIC_URL + link}>
        <Icon name={icon} />
        <span style={{marginRight:i18n.language==="ar"?"1rem":"0rem"}}>{props.children}</span>
      </Link>
    </div>
  );
};
