import {
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext } from "react";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosIntercept from "../hooks/useAxiosIntercept";

export const UserContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const setUserNameImage = (username, imageUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: imageUrl,
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const signInWithGoogle = (navigate, from, hook) => {
    return signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const loggedInUser = result.user;

        const response = await hook.post(`users`, {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          image: loggedInUser.photoURL,
          role: "student",
        });
        setUser(loggedInUser);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Google Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const signInWithGithub = (navigate, from, hook) => {
    return signInWithPopup(auth, githubProvider)
      .then(async (result) => {
        const loggedInUser = result.user;

        const response = await hook.post(`users`, {
          name: loggedInUser.displayName,
          email: loggedInUser.email,
          role: "student",
        });

        setUser(loggedInUser);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Github Login Successful!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("auth state change", currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    createUser,
    signIn,
    logout,
    loading,
    setUserNameImage,
    signInWithGoogle,
    signInWithGithub,
  };

  return (
    <UserContext.Provider value={authInfo}>{children}</UserContext.Provider>
  );
};

export default AuthProviders;
