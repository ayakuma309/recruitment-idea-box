import React, { useEffect, useState } from 'react'
import styles from "./styles/Post.module.css";

import { db } from '../firebase';
import firebase from "firebase/app";

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
import SendIcon from "@material-ui/icons/Send";

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
    justifyContent: 'space-between',
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

interface COMMENT {
  id: string;
  text: string;
  timestamp: any;
  username: string;
}

const Post: React.FC<PROPS> = (props) => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  //コメントする際のuseState
  const [openComments, setOpenComments] = useState(false);
  //コメント投稿フォームのuseState
  const [comment, setComment] = useState("");
  //コメント一覧のuseState
  const [comments, setComments] = useState<COMMENT[]>([
    {
      id: "",
      text: "",
      username: "",
      timestamp: null,
    },
  ]);

  //コメント一覧取得(postのidに紐づいたコメントを持ってくる)
  useEffect(() => {
    const unSub = db
      .collection("posts")
      .doc(props.postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            username: doc.data().username,
            timestamp: doc.data().timestamp,
          }))
        );
      });

    return () => {
      unSub();
    };
  }, [props.postId]);

  //コメント新規投稿
  const newComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //一つの投稿に紐づいている
    db.collection("posts").doc(props.postId).collection("comments").add({
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setComment("");
  };

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
            <Button
              size="small"
              onClick={() => setOpenComments(!openComments)}
            >
              コメント
            </Button>
            {/* コメントするか */}
            {openComments && (
              <>
                {/* コメント一覧 */}
                {comments.map((com) => (
                  <div key={com.id} className={styles.post_comment}>

                    <span className={styles.post_commentUser}>{com.username}</span>
                    <span className={styles.post_commentText}>{com.text} </span>
                  </div>
                ))}

                {/* 新規コメント */}
                <form onSubmit={newComment}>
                  <div className={styles.post_form}>
                    <input
                      className={styles.post_input}
                      type="text"
                      placeholder="Type new comment..."
                      value={comment}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setComment(e.target.value)
                      }
                    />
                    <button
                      disabled={!comment}
                      className={
                        comment ? styles.post_button : styles.post_buttonDisable
                      }
                      type="submit"
                    >
                      <SendIcon className={styles.post_sendIcon} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        
        </CardActions>
      </Card>
    </>
  )
}

export default Post
