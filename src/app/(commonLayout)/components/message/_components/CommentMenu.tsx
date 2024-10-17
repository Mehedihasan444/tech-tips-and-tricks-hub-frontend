"use client";
import React, { Dispatch } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Ellipsis } from "lucide-react";
import { TComment } from "@/types/TComment";
import { useDeleteComment } from "@/hooks/comment.hook";
import { useUser } from "@/context/user.provider";
import { TPost } from "@/types/TPost";

const CommentMenu = ({
  comment,
  setReplyTo,
  setComment,
  setText,
  setUpdateComment,
  post,
}: {
  comment: TComment;
  setReplyTo: Dispatch<string>;
  setComment: Dispatch<TComment>;
  setText: Dispatch<string>;
  setUpdateComment: Dispatch<boolean>;
  post: TPost;
}) => {
  const { mutate: deleteComment } = useDeleteComment();
  const { user } = useUser();
  const handleDelete = (commentId: string, postId: string) => {
    // delete comment logic here
    console.log(commentId, postId);
    deleteComment({ commentId, postId });
  };
  const handleEdit = () => {
    setText(comment.commentText);
    setComment(comment);
    setUpdateComment(true);
  };
  const handleReply = () => {
    if (comment) {
      setReplyTo(comment?.commentUser?.name);
      setComment(comment);
    }
  };

  return (
    <>
      <div className="bg-default-200 p-2  rounded-lg">
        <div className="flex justify-between">
          <h3 className="font-semibold text-sm">
            {comment?.commentUser?.name}
          </h3>
          {user?.nickName == post?.author?.nickName ? (
            <Dropdown size="sm">
              <DropdownTrigger>
                <button>
                  <Ellipsis size={16} />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  onClick={() => handleDelete(comment?._id, comment?.postId)}
                >
                  Delete
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  color="default"
                  className=""
                  onClick={handleEdit}
                >
                  Edit
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : user?.nickName == comment?.commentUser?.nickName ? (
            <Dropdown size="sm">
              <DropdownTrigger>
                <button>
                  <Ellipsis size={16} />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  onClick={() => handleDelete(comment?._id, comment?.postId)}
                >
                  Delete
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  color="default"
                  className=""
                  onClick={handleEdit}
                >
                  Edit
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
        <p className="text-sm text-default-600">{comment.commentText}</p>
      </div>
      <div className="flex justify-between gap-5 px-3">
        <span className="text-xs font-semibold text-default-500">11h</span>
        {/* <button className="text-xs font-semibold text-default-500">Like</button> */}
        <button
          onClick={handleReply}
          className="text-xs font-semibold text-default-500"
        >
          Reply
        </button>
      </div>
    </>
  );
};

export default CommentMenu;
