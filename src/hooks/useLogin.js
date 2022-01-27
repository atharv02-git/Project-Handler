import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  // so now we are not updating any state in a component if that component unmounts,if we go to a different page as we've set setIsCancelled to be true so it won't update any state as far as it is true
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState("");
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // logging in user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      //update online status
      await projectFirestore
        .collection("users")
        .doc(res.user.uid)
        .update({ online: true });
      // dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.error(err);
        setError(err);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, login };
};
