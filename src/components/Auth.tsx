import React from 'react';
import Header from './Header';
import styles from "./styles/Auth.module.css";
import CameraIcon from "@material-ui/icons/Camera";
import { auth, provider } from "../firebase";
import { Button } from '@material-ui/core';
//ログイン前
const Auth:React.FC = () => {
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.center}>
          <h1 className={styles.heading}>アイデアを寄付してください</h1>
          <p className={styles.heading}>よろしくお願いします</p>
          {/* <img src={} alt="top" /> */}

          {/* Googleログイン */}
          <Button
            variant="contained"
            startIcon={<CameraIcon />}
            onClick={signInGoogle}
          >
            SignIn with Google
          </Button>
        </div>
      </div>
    </>
  )
}

export default Auth
