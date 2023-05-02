import React, { useEffect, useState } from 'react'
import styles from "./styles/Post.module.css";

import { db } from '../firebase';
import firebase from "firebase/app";

import SendIcon from "@material-ui/icons/Send";
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface PROPS {
  postId: string;
}
interface COMMENT {
  id: string;
  text: string;
  timestamp: any;
  username: string;
}

const PostComment: React.FC<PROPS> = (props) => {
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

  //いいね済みかどうかを判定するためのuseState
  const [isLiked, setIsLiked] = useState(false);
  //いいねをカウントする
  const [likesCount, setLikesCount] = useState(0);

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


  //いいねを保存
  const handleLikeSave = () => {
    db.collection("posts").doc(props.postId).collection("likes").doc(user.uid).set({
      username: user.displayName,
    });
    setIsLiked(true);
  }
  const handleUnlikeSave = () => {
    db.collection("posts").doc(props.postId).collection("likes").doc(user.uid).delete();
    setIsLiked(false);
  }

  //いいね済みかどうかを判定するuseEffect
  useEffect(() => {
    if(user){
      db.collection("posts")
      .doc(props.postId)
      .collection("likes")
      .doc(user.uid)
      .onSnapshot((snapshot) => {
        if (snapshot.exists) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      });
    }
  },[props.postId, user]);

  //いいね数をカウント
  useEffect(() => {
    const getLikesCount = async () => {
      const snapshot = await db
        .collection("posts")
        .doc(props.postId)
        .collection("likes")
        .get(); //いいね数を取得
      setLikesCount(snapshot.docs.length);
    };
    getLikesCount();
  },[props.postId]);

  return (
    <div>
      <Button size="small">
        {isLiked ? <FavoriteIcon color="secondary" onClick={handleUnlikeSave}/> : <FavoriteBorderIcon onClick={handleLikeSave}/>}
        {likesCount}
      </Button>
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
          <h3 className={styles.heading}>コメント一覧</h3>
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
                placeholder="コメントを投稿する"
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
  )
}

export default PostComment
