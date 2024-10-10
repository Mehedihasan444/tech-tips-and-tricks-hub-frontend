/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/config/axios.config";
import envConfig from "@/config/envConfig";
import { revalidateTag } from "next/cache";
import { getCurrentUser } from "../AuthService";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/posts", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};

export const getPosts = async () => {
  const fetchOption = {
    next: {
      cache: "force-cache",
      tags: ["posts"],
    },
  };

  const res = await fetch(
    `${envConfig.baseApi}/posts?sortBy=-createdAt&limit=9`,
    fetchOption
  );

  return res.json();
};
export const getPost = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/posts/${postId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const getMyPosts = async () => {
  const user = await getCurrentUser();

  const res = await axiosInstance.get(`/posts?author=${user?._id}`);

  return res.data;
};
