import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}

const EMPTY_USER_OBJECT = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    photo: "",
    role: "",
  },
};

const INITIAL_USER_STATE = JSON.parse(
  localStorage.getItem("userInfo") || JSON.stringify(EMPTY_USER_OBJECT),
);

interface UserContextType {
  userInfo: User;
  isUserLoggedIn: boolean;
  setUserInfo: (user: User) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserState] = useState<User>(INITIAL_USER_STATE.userInfo);

  const setUserInfo = (data: User) => {
    localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));
    setUserState(data);
  };

  const removeUser = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("jwt");
    setUserState(EMPTY_USER_OBJECT.userInfo);
  };

  const isUserLoggedIn = localStorage.getItem("jwt") ? true : false;

  // Clear storage if no token but user info is present
  if (!isUserLoggedIn && userInfo._id) removeUser();

  return (
    <UserContext.Provider
      value={{
        userInfo,
        isUserLoggedIn,
        setUserInfo,
        removeUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const User = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
export default User;
