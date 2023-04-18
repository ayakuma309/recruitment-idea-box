import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import styles from "./App.module.css";
import Feed from './components/Feed';
import Auth from './components/Auth';
import "./App.css";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch(
          login({
            uid: authUser.uid,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  },[dispatch]);
  return(
    <>
      {user.uid ? (
        <div className={styles.app}>
          <Feed />
        </div>
      ) : (
        <Auth />
      )}
    </>
  )
}

export default App;
