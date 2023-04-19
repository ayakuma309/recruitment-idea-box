import React, { useState } from 'react'
import { auth } from '../firebase';
import { updateUserProfile } from '../features/userSlice';
import { useDispatch } from 'react-redux';

import styles from './Header.module.css'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  makeStyles,
  Modal,
  TextField,
} from "@material-ui/core";

//モーダルのスタイル(material-uiより)
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Header:React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  //Eメールログイン
  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password);
  };

  //新規登録
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password);

    //displayNameとphotoURLを更新する(firebase)
    await authUser.user?.updateProfile({
      displayName: username,
    });
    //reduxの方も設定
    dispatch(
      updateUserProfile({
        displayName: username,
      })
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Box textAlign="left">Sample</Box>
          </Typography>
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div style={getModalStyle()} className={classes.modal}>
              <div className={styles.login_modal}>
                <Typography component="h1" variant="h5">
                  {isLogin ? "Login" : "Register"}
                </Typography>
                {!isLogin && (
                  <>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      value={username}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setUsername(e.target.value);
                      }}
                    />
                    </>)}
                  <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
                    setPassword(e.target.value);
                  }}
                />
                <Button
                disabled={
                  isLogin
                    ? !email || password.length < 6
                    : !username || !email || password.length < 6
                }
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={
                  isLogin
                    ? async () => {
                        try {
                          await signInEmail();
                        } catch (err:any) {
                          alert(err.message);
                        }
                      }
                    : async () => {
                        try {
                          await signUpEmail();
                        } catch (err:any) {
                          alert(err.message);
                        }
                      }
                }
              >
                {isLogin ? "Login" : "Register"}
              </Button>
              <span
                className={styles.login_toggleMode}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Create new account ?" : "Back to login"}
              </span>
              </div>
            </div>
          </Modal>
          <Button
          color="inherit"
          onClick={() => setOpenModal(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
