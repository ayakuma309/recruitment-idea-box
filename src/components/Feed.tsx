import React from 'react'
import AfterLoginHeader from './AfterLoginHeader'

import styles from "./styles/Feed.module.css";
import InputPost from './InputPost';
const Feed = () => {
  return (
    <div>
      <AfterLoginHeader />
      <InputPost />
    </div>
  )
}

export default Feed
