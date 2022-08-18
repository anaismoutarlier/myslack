import { useState, useEffect, useCallback } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  FacebookAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

const providers = {
  google: new GoogleAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

export default function useFirebase(config) {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const app = initializeApp(config);
    setAuth(getAuth(app));
    setDb(getFirestore(app));
  }, [config]);

  const updateUser = useCallback(
    async (uid, update) => {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, update, { merge: true });
      //await addDoc(collection(db, "users"), newUser);
    },
    [db]
  );

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        if (authUser) {
          const newUser = {
            photoURL: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
            lastLogged: new Date(),
            online: true,
          };

          updateUser(authUser.uid, newUser);
        } else {
          //updateUser(user.uid, { online: false });
        }
        setUser(authUser);
      });

      return () => unsubscribe();
    }
  }, [auth, updateUser]);

  const login = async provider =>
    await signInWithPopup(auth, providers[provider]);

  const logout = async () => await signOut(auth);

  const addMessage = async message => {
    await addDoc(collection(db, "messages"), message);
  };

  const getMessages = handleSnapshot => {
    console.log("get messages")
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    return onSnapshot(q, handleSnapshot);
  };
  return {
    user,
    firebase: {
      login,
      logout,
      addMessage,
      getMessages,
    },
  };
}
