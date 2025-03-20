import React, { createContext, useContext, useReducer, ReactNode } from "react";
import type { User } from "../types/User";

const EMPTY_USER_OBJECT = {
  userInfo: {
    _id: "",
    name: "",
    email: "",
    photo: "",
    role: "user" as const,
  },
};

const INITIAL_USER_STATE = JSON.parse(
  localStorage.getItem("userInfo") || JSON.stringify(EMPTY_USER_OBJECT),
);

const USER_REDUCER_ACTION_TYPES = {
  SET_USER_INFO: "SET_USER_INFO",
} as const;

type UserState = {
  userInfo: User;
};

type UserAction = {
  type: typeof USER_REDUCER_ACTION_TYPES.SET_USER_INFO;
  payload: UserState;
};

interface UserContextType {
  userInfo: User;
  isUserLoggedIn: boolean;
  setUserInfo: (user: User) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const userReducer = (state: UserState, action: UserAction): UserState => {
  const { type, payload } = action;

  switch (type) {
    case USER_REDUCER_ACTION_TYPES.SET_USER_INFO:
      return { ...state, ...payload };

    default:
      throw new Error(`Undefined reducer action type: ${type} in userReducer`);
  }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [{ userInfo }, dispatch] = useReducer(userReducer, INITIAL_USER_STATE);

  const setUserInfo = (data: User) => {
    localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));

    dispatch({
      type: USER_REDUCER_ACTION_TYPES.SET_USER_INFO,
      payload: {
        userInfo: data,
      },
    });
  };

  const removeUser = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("jwt");

    dispatch({
      type: USER_REDUCER_ACTION_TYPES.SET_USER_INFO,
      payload: EMPTY_USER_OBJECT,
    });
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
