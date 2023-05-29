import React, { useState } from "react";
import UserAvatar from "../../../../components/user/UserAvatar";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import store from 'store';
import { useTranslation } from "react-i18next";

const mapStateToProps = ({ user }) => ({
  user: user,
  // name: user.name,
  // email: user.email,
});


const User = (user) => {
  const {t,i18n}=useTranslation(['common'])
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);

  const handleSignout = () => {
    store.remove("access_token");
    store.remove("refresh_token");
    store.remove("uid");
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <div className="user-toggle">
          <UserAvatar icon="user-alt" className="sm"/>
        </div>
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm" style={{display:"flex",flexDirection: i18n.language === "ar" ? "row-reverse" : "row"}}>
            <div className="user-avatar" >
              <span>AB</span>
            </div>
            <div className="user-info" style={{marginRight: i18n.language === "ar" ? "1rem" : "0rem"}}>
              <span className="lead-text">{user.user.name}</span>
              <span className="sub-text">{user.user.email}</span>
            </div>
          </div>
        </div>
        <div className="dropdown-inner">
          <LinkList>
         
            <LinkItem style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}} link="/user-profile" icon="user-alt" onClick={toggle}>
              {t('view_profile_btn')}
            </LinkItem>
            <LinkItem style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}} link="/account-settings" icon="setting-alt" onClick={toggle}>
            {t('account_settings_btn', { ns: "common" })}
            </LinkItem>
            {/* <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem> */}
          </LinkList>
        </div>
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth/login`} onClick={handleSignout} style={{direction: i18n.language === "ar" ? "rtl" : "ltr"}}>
              <Icon name="signout"></Icon>
              <span style={{marginRight: i18n.language === "ar" ? "1rem" : "0rem"}}> {t('signout_btn')}</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default withRouter(connect(mapStateToProps)(User));
