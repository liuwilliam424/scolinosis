/*
ScoliNOsis Wearable Sensor Project
Sid Avhad, Michael Gao, William Judd, William Liu, Eric Xu
6/8/22
Firebase logic
*/

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  collection,
  getFirestore,
  addDoc,
  query,
  orderBy,
  Timestamp,
  getDocs,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import React, { createContext, useState } from "react";
import { SensorData, FirebaseDoc } from "../interface";
//firebase npm
const firebaseConfig = {
  apiKey: "AIzaSyDANY_SnefUQR-lcKAtHHzERGk3kf1sz3A",
  authDomain: "scoliosissensor.firebaseapp.com",
  projectId: "scoliosissensor",
  storageBucket: "scoliosissensor.appspot.com",
  messagingSenderId: "332554643929",
  appId: "1:332554643929:web:173d14bcd0a2d8f70f51c8",
  measurementId: "G-QDJ80W027B",
};

interface FirebaseContextAPI {
  addData: (left: SensorData, right: SensorData) => void;
  getData: () => Promise<FirebaseDoc[] | undefined>;
  signIn: () => void;
  signOut: () => void;
  loggedIn: boolean;
  loaded: boolean;
}

const FirebaseContext = createContext<FirebaseContextAPI>({
  addData: () => {
    //resolve promise
  },
  getData: () => {
    return Promise.resolve(undefined);
  },
  signIn: () => {
    //
  },
  signOut: () => {
    //
  },
  loggedIn: false,
  loaded: false,
});

const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [UID, setUID] = useState<string>();
  const [loaded, setLoaded] = useState(false);

  function addData(left: SensorData, right: SensorData) {
    //** First set of numbers is from left sensor */
    if (!UID) {
      throw Error("You're not logged in");
    }

    // setDoc(doc(db, "users", UID), {});

    addDoc(collection(db, UID), {
      left: left,
      right: right,
      time: Timestamp.now(),
    }).catch(console.error);
  }
  async function getData() {
    //** First set of numbers is from left sensor */
    if (!UID) {
      return undefined;
    }
    const data: FirebaseDoc[] = [];
    (await getDocs(query(collection(db, UID), orderBy("time")))).forEach(
      (res) => {
        data.push(res.data() as FirebaseDoc);
      }
    );
    return data;
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => {
      /* */
      console.log(error);
    });
  };
  const _signOut = () => {
    signOut(auth);
  };
  onAuthStateChanged(auth, (user) => {
    setLoaded(true);
    setUID(user?.uid);
  });

  return (
    <FirebaseContext.Provider
      value={{
        addData: addData,
        getData: getData,
        signIn: signInWithGoogle,
        loggedIn: !!UID,
        signOut: _signOut,
        loaded: loaded,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
