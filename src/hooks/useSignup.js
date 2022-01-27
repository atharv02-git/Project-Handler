import { useState, useEffect } from "react";
import { projectAuth, projectStorage, projectFirestore } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  // so now we are not updating any state in a component if that component unmounts,if we go to a different page as we've set setIsCancelled to be true so it won't update any state as far as it is true
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState("");
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // Signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup");
      }

      // upload User thumbnail, Note: we need to upload user thumbnail before displaying the user and after signing up the user
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}` //here we are defining a path where folder is created wrt diff user id
      const img =  await projectStorage.ref(uploadPath).put(thumbnail) //A Reference represents a specific location in your Database and can be used for reading or writing data to that Database location.
      // The above await statement returns an object which is then stored in the img
      const imgUrl = await img.ref.getDownloadURL() //here we need to get the url we just uploaded so that we can pass it to the photoURL

      // Displaying user name
      await res.user.updateProfile({ displayName, photoURL: imgUrl }); //where photoURL is the property to display avatar of the user
      
      //creating user document, note: the id pof the doc will be the same as of the id of the user
      await projectFirestore.collection('users').doc(res.user.uid).set({
        online: true, //as initially during creating new user the status is set to online
        displayName,
        photoURL: imgUrl
      })

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

  return { error, isPending, signup };
};
