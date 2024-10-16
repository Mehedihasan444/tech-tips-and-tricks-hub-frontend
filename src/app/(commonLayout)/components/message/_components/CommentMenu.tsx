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
const items = [
  {
    key: "edit",
    label: "Edit comment",
  },
  {
    key: "delete",
    label: "Delete comment",
  },
];
const CommentMenu = ({
  comment,
  setReplyTo,
  setComment,
}: {
  comment: TComment;
  setReplyTo: Dispatch<string>;
  setComment: Dispatch<TComment>;
}) => {
  // const { mutate } = useCreateComment();

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
          <Dropdown size="sm">
            <DropdownTrigger>
              <button>
                <Ellipsis size={16} />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dynamic Actions" items={items}>
              {(item) => (
                <DropdownItem
                  key={item.key}
                  color={item.key === "delete" ? "danger" : "default"}
                  className={item.key === "delete" ? "text-danger" : ""}
                >
                  {item.label}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <p className="text-sm text-default-600">{comment.commentText}</p>
      </div>
      <div className="flex justify-between gap-5 px-3">
        <span className="text-xs font-semibold text-default-500">11h</span>
        <button className="text-xs font-semibold text-default-500">Like</button>
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
