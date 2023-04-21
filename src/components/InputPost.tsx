import React, { useState } from "react";
import styles from "./styles/InputPost.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
//TimeStampを取得したい
import firebase from "firebase/app";
import { Button, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const InputPost: React.FC = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const sendPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    db.collection("posts").add({
      title: title,
      description: description,
      //firebaseの時刻を取得できる
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <div className={classes.paper}>
      <form onSubmit={sendPost}>
        <div className={styles.post_form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="タイトル"
            placeholder="タイトルを入力してください"
            type="text"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="description"
            label="内容"
            name="description"
            autoComplete="description"
            placeholder="内容を入力してください"
            type="text"
            autoFocus
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={!title || !description}
          variant="contained"
          className={title ? styles.post_sendBtn : styles.post_sendDisableBtn}
        >
          投稿
        </Button>
      </form>
    </div>
  );
};

export default InputPost;
