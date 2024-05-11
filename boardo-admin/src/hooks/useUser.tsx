import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";

const useUser = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserInfo(user);
        setLoading(false);
      } else {
        // User is signed out
        setUserInfo(null);
      }
    });

    return unsubscribe;
  }, []);

  return { userInfo, loading};
};

export default useUser;
