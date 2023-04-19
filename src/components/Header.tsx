import React, { useEffect } from 'react'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  makeStyles,
} from "@material-ui/core";
import { auth } from '../firebase';
import { login, logout, selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header:React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged((authUser) => {
        if(authUser){
          dispatch(
            login({
              uid: authUser.uid,
              photoUrl: authUser.photoURL,
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Box textAlign="left">Sample</Box>
          </Typography>
            <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
