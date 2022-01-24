// To fetch collections using real time data to fetch transactions and show them on home page
import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    // function to show data that belongs to the only user who created
    if (query) {
      ref = ref.where(...query);
    }

    if(orderBy){
      ref = ref.orderBy(...orderBy)
    }
    // Where onSnapshot returns two argument and other is error property
    const unSubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
          // where doc.data() is the property that is used to add data and id is the property of every firestore document
        });

        // updating all states
        setDocument(results);
        setError(null);
      },
      (error) => {
        console.error(error);
        setError("Oops, couldn't fetch the data :(");
      }
    );

    // unsubscribing on unMount i.e: if the user moves to diff page then it won't subscribe to the data and then automaticatically unsunscibes
    return () => unSubscribe();
  }, [collection, query, orderBy]);

  return { document, error };
};
