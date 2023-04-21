import React, { useEffect, useState }  from 'react'
import { db } from "../firebase";

import AfterLoginHeader from './AfterLoginHeader'
import ModalPost from './ModalPost';
const Feed:React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      text: "",
      description: "",
      timestamp: "",
      username: "",
    },
  ]);

  //firebaseからデータ取り出す
  useEffect(() => {
    const unSub = db
      .collection("posts")
      .orderBy("timestamp", "desc")
      //firebaseにデータがあるたびに毎回処理が走るonSnapshotで全データ持ってくる。doc.data()で各データにアクセスできる。
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            text: doc.data().text,
            description: doc.data().description,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
          }))
        )
      );
    return () => {
      unSub();
    };
  }, []);
  return (
    <div>
      <AfterLoginHeader />
      <ModalPost />
      <div>
        {posts.map((post) => (
          <h3>{post.id}</h3>
        ))}
      </div>
    </div>
  )
}

export default Feed
