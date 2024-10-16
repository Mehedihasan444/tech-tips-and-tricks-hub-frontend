import { getAllCommentsOfASinglePost } from "@/services/CommentService";
import React, { Dispatch, useEffect, useState } from "react";
import { TPost } from "@/types/TPost";
import { TComment } from "@/types/TComment";
import Comment from "./Comment";


const Messages = ({
  post,
  setReplyTo,
  seeMore,
  setComment,
 
}: {
  post:TPost;
  setReplyTo: Dispatch<string>;
  setComment: Dispatch<TComment>;
  seeMore: boolean;
}) => {
  const [comments, setComments] = useState<TComment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await getAllCommentsOfASinglePost(post?._id);
        setComments(data || []);
        console.log(data)
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setLoading(false);
      }
    };

    if (post?._id) {
      fetchComments(); // Call the API to fetch comments only once when the component mounts
    }
  }, [post]); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="max-h-40 overflow-y-auto">
      {comments?.length > 0 ? (
        <div className="">
          {seeMore ? (
            <div className="">
              {/* {comments?.map((comment: TComment) => (
                <div key={comment._id}> */}
                {comments?.map((comment: TComment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    setReplyTo={setReplyTo}
                    setComment={setComment}
                  />
                ))}
              {/* </div>
              ))} */}
            </div>
          ) : (
            <div >
                {comments?.slice(0,2)?.map((comment: TComment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    setReplyTo={setReplyTo}
                    setComment={setComment}
                  />
                ))}
              </div>
          )}
        </div>
      ) : (
        <div>No comments yet.</div>
      )}
    </div>
  );
};

export default Messages;
