import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { app, db } from "../Firebase/firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(app);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, displayName, role) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName });

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
      });

      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          role: "normal", // Default role
        });
      }

      const role = userDoc.data()?.role || "normal";
      setUser({ ...user, role });
      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      console.error("Error during Google sign-in: ", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          const role = userDoc.data()?.role || "normal";
          const userData = { ...currentUser, role };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user role: ", error.message);
        }
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const Login = async (email, password) => {
    setLoading(true);
    try {
      if (!email || !password) {
        throw new Error("Email and password cannot be empty");
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const role = userDoc.data()?.role || "normal";

      setUser({ ...user, role });
      setLoading(false);
      return userCredential;
    } catch (error) {
      setLoading(false);
      console.error("Login error: ", error.message);
      throw error;
    }
  };

  const Logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createUser,
    Login,
    googleLogin,
    Logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="loading w-40 loading-spinner text-primary"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
