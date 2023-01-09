import React from "react";
import Icon from "../../../icon/Icon";
import { notificationData } from "./NotificationData";
import { CardTitle } from "reactstrap";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const {t,i18n}=useTranslation(['notifications'])

  const translateNotifications=(notification)=>{
    console.log("Notificqation to is",notification)
    if(notification==="You have requested to Widthdraw"){
      return t('withdrawl_request_nt')
    }
    else if(notification==="Your Deposit Order is placed"){
      return t('order_place_nt')
    }
    else return notification
  }
  return (
    <React.Fragment>
      <div className="card-inner border-bottom">
        <div className="card-title-group">
          <CardTitle>
            <h6 className="title">Notifications</h6>
          </CardTitle>
          <div className="card-tools">
            <a
              href="#viewall"
              className="link"
              onClick={(ev) => {
                ev.preventDefault();
              }}
            >
              View All
            </a>
          </div>
        </div>
      </div>
      <div className="card-inner">
        <div className="timeline">
          <h6 className="timeline-head">November, 2019</h6>
          <ul className="timeline-list">
            {notificationData.map((item) => {
              return (
                <li className="timeline-item" key={item.id}>
                  <div className={`timeline-status ${item.fill} ${item.outline ? "is-outline" : ""}`}></div>
                  <div className="timeline-date">
                    {item.date} <Icon name="alarm-alt"></Icon>
                  </div>
                  <div className="timeline-data">
                    <h6 className="timeline-title">{translateNotifications(item.text)}</h6>
                    <div className="timeline-des">
                      <p>{item.subtitle}</p>
                      <span className="time">{item.time}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Notifications;
