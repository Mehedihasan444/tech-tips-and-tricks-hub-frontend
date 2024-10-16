/* eslint-disable @typescript-eslint/no-explicit-any */
import { createComment, replyComment } from "@/services/CommentService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export type TCommentCreate = {
  postId: string;
  commentText: string;
  commentUser: {
    name: string;
    photo: string;
  };
  createdAt: Date;
};

export const useCreateComment = () => {
  return useMutation<any, Error, TCommentCreate>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (commentData) => await createComment(commentData),
    onSuccess: () => {
      toast.success("Comment posted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export type TReplyComment = {
  commentId: string;
  data: {
    postId: string;
    commentText: string;
    commentUser: {
      name: string;
      photo: string;
    };
    createdAt: Date;
  };
};
export const useReplyComment = () => {
  return useMutation<any, Error, TReplyComment>({
    mutationKey: ["REPLY_COMMENT"],
    mutationFn: async (commentData) => await replyComment(commentData), // Destructure the input
    onSuccess: () => {
      toast.success("Reply posted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
