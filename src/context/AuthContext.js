import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      break;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    // now checking if the user is still logged in after the page refresh, so the initial value is false it means the user is not logged in
    authIsReady: false,
  });
  // useEffect runs only once when the the auth state changes
  useEffect(() => {
    const unSubscribe = projectAuth.onAuthStateChanged((user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unSubscribe();
    });
  }, []);
  console.log("AuthContext state:", state);

  return (
    //   later on when we create custom hook to control sigup login logout then dispatch hook can be used to update our context values
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
