import React, { useEffect, useState } from "react";
import { Posts } from "./Main";
import { auth, db } from "../../config/firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  posts: Posts;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { posts } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", posts.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: posts.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeDelete = query(
        likesRef,
        where("postId", "==", posts.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeDelete);
      const likeId = likeToDeleteData.docs[0].id;

      const likeToDelete = doc(db, "likes", likeId);

      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="postcard">
      <div className="title">
        <h1>{posts.title}</h1>
      </div>
      <div className="body">
        <p>{posts.description}</p>
      </div>
      <div className="footer">
        <div className="footerlike">
          <button
            className="likebutton"
            onClick={hasUserLiked ? removeLike : addLike}
          >
            {hasUserLiked ? <>&#128150;</> : <>&#128153;</>}
          </button>
          {likes && <p> {likes?.length} </p>}
        </div>
        <p>@{posts.username}</p>
      </div>
    </div>
  );
};
