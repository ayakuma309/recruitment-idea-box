import React from 'react'
import AfterLoginHeader from './AfterLoginHeader'
import styles from './styles/Feed.module.css'
import InputPost from './InputPost';
const Feed = () => {
  return (
    <div>
      <AfterLoginHeader />
      <InputPost />
      <div className={styles.post_float_btn}>
        <p className={styles.post_plus}>投稿</p>
      </div>
    </div>
  )
}

export default Feed
