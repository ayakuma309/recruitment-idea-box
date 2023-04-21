import React, { useEffect, useState }  from 'react'
import { db } from "../firebase";

import AfterLoginHeader from './AfterLoginHeader'
import ModalPost from './ModalPost';
import Post from './Post';
const Feed:React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: "",
      title: "",
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
            title: doc.data().title,
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
        {posts[0]?.id && (
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                title={post.title}
                description={post.description}
                timestamp={post.timestamp}
                username={post.username}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default Feed
