import { useReducer, useState, useEffect } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  error: null,
  isPending: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  //   for cleanup function
  const [isCancelled, setIsCancelled] = useState(false);

  //   collection reference
  const ref = projectFirestore.collection(collection);

  // only dispath if not cancelled, i.e we have to trigger response only if user is on the same page as useFirestore hook
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add a document
  const adddocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
      // No need to add payload because the document is not updating its getting directly deleted and the value is undefined
    } catch (err) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "could not delete document",
      });
    }
  };

  //updating firestore document
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const updatedDocument = await ref.doc(id).update(updates);
      dispatchIfNotCancelled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
      return null;
    }
  };

  //   useEffect for cleanup function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { adddocument, deleteDocument, updateDocument, response };
};
