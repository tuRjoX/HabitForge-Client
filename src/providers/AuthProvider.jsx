import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // Register new user
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Update profile with name and photo
    await updateProfile(result.user, {
      displayName: name,
      photoURL: photoURL || "https://i.ibb.co/0jZ1Z1Z/default-avatar.png",
    });

    // Save user to database
    await saveUserToDB({
      email: result.user.email,
      displayName: name,
      photoURL: photoURL || "https://i.ibb.co/0jZ1Z1Z/default-avatar.png",
    });

    return result;
  };

  // Login with email and password
  const signIn = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google sign in
  const googleSignIn = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);

    // Save user to database
    await saveUserToDB({
      email: result.user.email,
      displayName: result.user.displayName,
      photoURL: result.user.photoURL,
    });

    return result;
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  };

  // Save user to database
  const saveUserToDB = async (userData) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, userData);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Update user profile
  const updateUserProfile = async (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Observer for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
