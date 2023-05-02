import React, { useState } from 'react'
import styles from "./styles/Post.module.css";

import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField
} from '@material-ui/core';
import PostComment from './PostComment';
import { db } from '../firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: '48%',
    height: '100%',
    margin: '10px auto',
    boxShadow: '8px -2px 52px -2px #777777',
    borderRadius: '10px',
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

  const deletePost = (postId: string) => {
    if (window.confirm('削除してもよろしいですか？')) {
      db.collection('posts').doc(postId).delete()
      .then(() => {
      console.log('投稿が削除されました');
      })
      .catch(() => {
      alert('Errorが発生しました');
      });
      }
  };

  //編集する
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedDescription, setEditedDescription] = useState(props.description);


  //編集するにはisEditingをtrueにする
  const editPost = (postId: string) => {
    setIsEditing(true);
    //元の投稿のタイトルと内容を表示する
    setEditedTitle(props.title);
    setEditedDescription(props.description);
  }

  //更新する
  const updatePost = (postId: string) => {
    db.collection('posts').doc(postId).update({
      title: editedTitle,
      description: editedDescription,
    })
    .then(() => {
      console.log('投稿が更新されました');
      setIsEditing(false);
    })
    .catch(() => {
      alert('Errorが発生しました');
    });
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography variant="h5" component="h2">
              {props.title}
            </Typography>
            <div>
              <Button size="small" onClick={() => editPost(props.postId)}>編集</Button>
              <Button size="small" onClick={() => deletePost(props.postId)}>削除</Button>
            </div>
          </div>
          {/* <Typography variant="h5" component="h2">
            {props.title}
          </Typography> */}
          <Typography variant="body2" component="p">
            <span className={styles.post_headerUser}>{props.username}</span>
            <br />
            {props.description}
          </Typography>
        </CardContent>
        <CardActions style={{display: 'block'}}>
          <div>
            {isEditing ? (
              <div>
                <h3 className={styles.heading}>
                  編集
                </h3>
                <div className={styles.post_form}>
                  <TextField type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
                  <TextField type="text" value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
                  <Button size="small" onClick={() => updatePost(props.postId)}>更新</Button>
                  <Button size="small" onClick={() => setIsEditing(false)}>キャンセル</Button>
                </div>
              </div>
            ) : (
              <PostComment postId={props.postId}/>
            )}
          </div>
        </CardActions>
      </Card>
    </>
  )
}

export default Post
