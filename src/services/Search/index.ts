"use server";

import axiosInstance from "@/config/axios.config";


export const searchPosts = async (searchTerm: string) => {
  try {
    const res = await axiosInstance.get(
      `/search-posts?searchTerm=${searchTerm}`
    );

    return res.data;
  } catch (error) {
    console.log(error)
    throw new Error("Failed to search posts");
  }
};