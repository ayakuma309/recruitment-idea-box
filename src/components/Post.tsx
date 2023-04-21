import React from 'react'
import styles from "./styles/Post.module.css";

interface PROPS {
  postId: string;
  title: string;
  description: string;
  timestamp: any;
  username: string;
}

const Post: React.FC<PROPS> = (props) => {
  return (
    <div className={styles.post}>
      <div className={styles.post_body}>
        <div>
          <div className={styles.post_header}>
            <h3>
              <span className={styles.post_headerUser}>@{props.username}</span>
            </h3>
          </div>
          <div className={styles.post_text}>
            <p>{props.title}</p>
          </div>
          <div className={styles.post_text}>
          <p>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
