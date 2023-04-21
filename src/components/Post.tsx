import React from 'react'
import styles from "./styles/Post.module.css";

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '48%',
    margin: '10px auto',
    boxShadow: '8px -2px 52px -2px #777777',
    borderRadius: '10px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between;',
  }
});


interface PROPS {
  postId: string;
  title: string;
  description: string;
  timestamp: any;
  username: string;
}

const Post: React.FC<PROPS> = (props) => {
  const classes = useStyles();
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
        <CardActions className={classes.buttons}>
          <div>
            <Button size="small">いいね</Button>
            <Button size="small">コメント</Button>
          </div>
          <div>
            <Button size="small">編集</Button>
            <Button size="small">削除</Button>
          </div>
        </CardActions>
      </Card>
    </>
  )
}

export default Post
