import React from 'react';
import { auth } from '../firebase';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

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

const AfterLoginHeader:React.FC = () => {
  const classes = useStyles();
  const primary = red[800];
  const handleLogout = () => {
    alert('ログアウトしてもよろしいですか？');
    auth.signOut();
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: primary }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Box textAlign="left">Sample</Box>
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AfterLoginHeader
