import { createContext, useEffect, useReducer, useState } from "react";
import client from "../../service/clientAxios";
import { tokenAuth } from "../../service/authTokenHeaders";
import { useAlert } from "../../hooks/useAlert";
import { authReducer } from "./AuthReducer";
import { LOGIN, LOGOUT } from "./types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { alert, showAlert } = useAlert();

  const initialState = {
    token: localStorage.getItem("token"),
    id: null,
    auth: null,
    user: null,
    type: null,
    email: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return setLoading(false);

      try {
        const { data } = await client.get("/operator", tokenAuth());
        const dataToken = {
          ...data.operator,
          token,
        };

        dispatch({
          type: LOGIN,
          payload: dataToken,
        });

      } catch (error) {
        localStorage.removeItem("token");
      }
      setLoading(false);
    };

    authUser();
  }, []);

  const registerUser = async (user) => {
    try {
      const { data } = await client.post("operator/register", user);

      showAlert({
        msg: data.msg,
        error: false,
      });

      return true;
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const loginUser = async (user) => {
    try {
      const { data } = await client.post("operator/login", user);
      localStorage.setItem("token", data.token);

      dispatch({
        type: LOGIN,
        payload: data,
      });

      return true;
    } catch (error) {
      showAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const logOut = () => {

    dispatch({
      type: LOGOUT,
    });
    
  };

  return (
    <AuthContext.Provider
      value={{
        alert,
        state,
        loading,
        showAlert,
        registerUser,
        loginUser,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
