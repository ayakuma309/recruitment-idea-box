import React from 'react'
import styles from "./styles/Post.module.css";

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';
import PostComment from './PostComment';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: '48%',
    height: '100%',
    margin: '10px auto',
    boxShadow: '8px -2px 52px -2px #777777',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
}));

interface PROPS {
  postId: string;
  title: string;
  description: string;
  timestamp: any;
  username: string;
}

const Post: React.FC<PROPS> = (props) => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" component="p">
            <span className={styles.post_headerUser}>{props.username}</span>
            <br />
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          {user.displayName === props.username ? (
            <div className={classes.buttons}>
              <Button size="small">編集</Button>
              <Button size="small">削除</Button>
            </div>
          ) :(
          <div className={classes.buttons}>
            <PostComment postId={props.postId}/>
          </div>
          )}
        </CardActions>
      </Card>
    </>
  )
}

export default Post
