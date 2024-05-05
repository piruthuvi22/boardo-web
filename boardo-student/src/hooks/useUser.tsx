import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import auth from "../config/firebase";

const useUser = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });

    return unsubscribe;
  }, []);

  return { userInfo };
};

export default useUser;



