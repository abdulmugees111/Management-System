import React from "react";
import { useTranslation } from "react-i18next";
import { DropdownToggle, DropdownMenu, UncontrolledDropdown } from "reactstrap";

import Icon from "../../../../components/icon/Icon";
import data from "./NotificationData";

const NotificationItem = (props) => {
  const {i18n}=useTranslation()
  const { icon, iconStyle, text, time, id } = props;
  return (
    <div style={{ display: "flex", flexDirection: i18n.language === "ar" ? "row-reverse" : "row" }} className="nk-notification-item" key={id} id={id}>
      <div className="nk-notification-icon" style={{ display: "flex", marginLeft: i18n.language === "ar" ? "1rem" : "0rem",marginRight: i18n.language === "ar" ? "0rem" : "1rem" }}>
        <Icon name={icon} className={[`icon-circle ${iconStyle ? " " + iconStyle : ""}`]} />
      </div>
      <div className="nk-notification-content">
        <div className="nk-notification-text">{text}</div>
        <div className="nk-notification-time" style={{textAlign: i18n.language === "ar" ? "right" : "left"}}>{time}</div>
      </div>
    </div>
  );
};

const Notification = () => {
  const { t, i18n } = useTranslation(['notification'])

  const translateNotifications = (notification) => {
    console.log("Notificqation to is", notification)
    if (notification === "You have requested to Widthdraw") {
      return t('withdrawl_request_nt')
    }
    else if (notification === "Your Deposit Order is placed") {
      return t('order_place_nt')
    }
    else return notification
  }
  return (
    <UncontrolledDropdown className="user-dropdown">
      <DropdownToggle tag="a" className="dropdown-toggle nk-quick-nav-icon">
        <div className="icon-status icon-status-info">
          <Icon name="bell" />
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-xl dropdown-menu-s1">
        <div className="dropdown-head" style={{direction:i18n.language==="ar"?"rtl":"ltr"}}>
          <span className="sub-title nk-dropdown-title">{t('notification_heading')}</span>
          <a href="#markasread" onClick={(ev) => ev.preventDefault()}>
            {t('mark_all_read')}
          </a>
        </div>
        <div className="dropdown-body">
          <div className="nk-notification" style={{ display: "flex", flexDirection: "column", alignItems: i18n.language === "ar" ? "flex-end" : "flex-start" }}>
            {data.notification.map((item) => {
              return (
                <NotificationItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  iconStyle={item.iconStyle}
                  text={translateNotifications(item.text)}
                  time={t("hours_ago", { time: item.time })}
                />
              );
            })}
          </div>
        </div>
        <div className="dropdown-foot center">
          <a href="#viewall" onClick={(ev) => ev.preventDefault()}>
            {t('view_all')}
          </a>
        </div>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default Notification;
