import { useState, useEffect } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  // so now we are not updating any state in a component if that component unmounts,if we go to a different page as we've set setIsCancelled to be true so it won't update any state as far as it is true
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState("");
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //update online status
      const { uid } = user
      await projectFirestore.collection('users').doc(uid).update({ online: false })

      await projectAuth.signOut();
      // dispatching logout and no need to pass payload as user is going to be null
      dispatch({ type: "LOGOUT" });
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
  return { logout, error, isPending };
};
