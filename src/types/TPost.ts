import { IUser } from "./IUser";

export type TPost = {
  _id: string;
  title: string;
  content: string;
  images: [string];
  category: string;
  tags: [string];
  author: IUser;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
