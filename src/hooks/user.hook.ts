/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateUser } from "@/services/UserService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateUser = () => {
    return useMutation<any, Error, { userId: string; loggedInUserId: string }>({
      mutationKey: ["UPDATE_USER"],
      mutationFn: async ({ userId, loggedInUserId }) => await updateUser(loggedInUserId,userId ), // Destructure the input
      onSuccess: () => {
        toast.success("Post updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };