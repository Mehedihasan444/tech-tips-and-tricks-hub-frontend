/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import axiosInstance from "@/config/axios.config";
import envConfig from "@/config/envConfig";
import { revalidateTag } from "next/cache";

export const getUser = async (nickName: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/users/${nickName}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
export const updateUser = async (
  loggedInUserId: string,
  userId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(`/users/${userId}`, {loggedInUserId}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("users");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update user");
  }
};