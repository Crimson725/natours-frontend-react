import { useEffect } from "react";
import User from "../../contexts/UserContext.tsx";
import { setPageTitle } from "../../utils/pageHead.ts";
import SideNavItem from "../ui/LayoutUI/SideNavItem.tsx";
import UserAccountSettings from "./UserAccountSettings.tsx";
import UserPasswordUpdate from "./UserPasswordUpdate.tsx";

const UserProfile = () => {
  const { userInfo } = User();

  useEffect(() => setPageTitle("Natours | Profile"), []);

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          <ul className="side-nav">
            <SideNavItem
              link="#"
              text="Settings"
              icon="settings"
              active={true}
            />
            <SideNavItem link="/my-tours" text="My Bookings" icon="basket" />
            <SideNavItem link="#" text="My Reviews" icon="star" />
            <SideNavItem link="#" text="Billing" icon="card" />
          </ul>
          {userInfo.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <SideNavItem link="#" text="Manage Tours" icon="map" />
                <SideNavItem link="#" text="Manage Users" icon="users" />
                <SideNavItem link="#" text="Manage Reviews" icon="star" />
                <SideNavItem link="#" text="Manage Bookings" icon="basket" />
              </ul>
            </div>
          )}
        </nav>
        <div className="user-view__content">
          <UserAccountSettings userInfo={userInfo} />
          <div className="line">&nbsp;</div>
          <UserPasswordUpdate />
        </div>
      </div>
    </main>
  );
};

export default UserProfile;
