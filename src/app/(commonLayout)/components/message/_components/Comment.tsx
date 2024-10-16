import { TComment } from "@/types/TComment";
import Image from "next/image";
import React, { Dispatch } from "react";
import CommentMenu from "./CommentMenu";

const Comment = ({
  comment,
  setReplyTo,
  setComment,
}: {
  comment: TComment;
  setReplyTo: Dispatch<string>;
  setComment: Dispatch<TComment>;
}) => {
  return (
    <div className="flex flex-col gap-2 mt-1">
      {/* Render the main comment */}
      <div className="flex gap-2">
        <div>
          <Image
            src={comment?.commentUser?.photo}
            alt={comment?.commentUser?.name}
            width={30}
            height={30}
            className="rounded-full h-[30px] w-[30px] object-cover"
          />
        </div>
        <div>
          <CommentMenu
            comment={comment}
            setReplyTo={setReplyTo}
            setComment={setComment}
          />
        </div>
      </div>

      {/* Recursively render children if there are any */}
      {comment?.children?.length > 0 && (
        <div className="ml-6">
          {comment.children.map((childComment: TComment) => (
            <Comment
              key={childComment._id} // Use a unique identifier for the key
              comment={childComment}
              setReplyTo={setReplyTo}
              setComment={setComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
