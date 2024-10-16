/* eslint-disable @typescript-eslint/no-explicit-any */

export type TComment = {
  _id: string;
  postId: string;
  commentText: string;
  commentUser: {
    name: string;
    photo: string;
  };
  createdAt: string;
  children: any;
};
