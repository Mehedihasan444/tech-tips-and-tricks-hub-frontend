/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import axiosInstance from "@/config/axios.config";
import { revalidateTag } from "next/cache";

export const createPayment = async (userId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/payment", {userId}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("payments");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create payment");
  }
};
