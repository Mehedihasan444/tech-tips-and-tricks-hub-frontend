"use client";
import { Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { IUser } from "@/types/IUser";
import { useCreateComment, useReplyComment } from "@/hooks/comment.hook";
import Messages from "./_components/Messages";
import { TPost } from "@/types/TPost";
import { TComment } from "@/types/TComment";

const Message = ({ user, post }: { user: IUser; post: TPost }) => {
  const [text, setText] = useState("");
  const { mutate: handleCreateComment } = useCreateComment();
  const { mutate: handleReplyComment } = useReplyComment();
  const [replyTo, setReplyTo] = useState("");
  const [seeMore, setSeeMore] = useState(false);
  const [comment, setComment] = useState<TComment>();

  const handleComment = async () => {
    if (replyTo && comment) {
      const commentData = {
        commentId: comment?._id,
        data: {
          postId: post?._id,
          commentText: text,
          commentUser: {name:user?.name,photo:user?.profilePhoto},
          createdAt: new Date(),
        },
      };
      handleReplyComment(commentData);
    } else {
      const commentData = {
        postId: post?._id,
        commentText: text,
        commentUser: {name:user?.name,photo:user?.profilePhoto},
        createdAt: new Date(),
      };
      handleCreateComment(commentData);
    }

    setText(""); // Clear the text after submission
  };

  return (
    <div className="">
      <button className="" onClick={() => setSeeMore(!seeMore)}>
        view more comments
      </button>
      {/* Comment Section */}
      <Messages
        post={post}
        setReplyTo={setReplyTo}
        seeMore={seeMore}
        setComment={setComment}
      />
      {/* comment textarea */}
      <div className="mt-2 flex gap-2">
        <div className="flex  ">
          {" "}
          <Image
            src={user?.profilePhoto}
            alt={user.name}
            width={30}
            height={30}
            className="rounded-full h-[30px] w-[30px] object-cover"
          />
        </div>
        <div className="flex-1">
          <Textarea
            // value={text}
            label={
              replyTo ? (
                <span className="text-xs text-primary">
                  replying to @{replyTo}
                </span>
              ) : null
            }
            variant="faded"
            placeholder="Write a comment"
            // disableAnimation
            // disableAutosize
            onChange={(e) => setText(e.target.value)}
            endContent={
              text && (
                <button onClick={() => handleComment()}>
                  <SendHorizonal className="text-primary" />
                </button>
              )
            }
            classNames={{
              input: "resize-y",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Message;
