import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // get real time collection of documents
  useEffect(() => {
    const ref = projectFirestore.collection.doc(id); //.doc(id) is used to refer the document of particular id

    const unSubscribe = ref.onSnapshot(
      (snapshot) => {
        setDocument({ ...snapshot.data(), id: snapshot.id }); //setDocument returns an object including the data we fetch from the document using .data() method and id of that document
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError("failed to load the documents");
      }
    );

    // unsubscribing on unMount i.e: if the user moves to diff page then it won't subscribe to the data and then automaticatically unsubscribes
    return () => unSubscribe();
  }, [collection, id]);

  return { document, error };
};
