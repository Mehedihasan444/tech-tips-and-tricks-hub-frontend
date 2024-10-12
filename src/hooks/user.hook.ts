/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteUser, updateUser } from "@/services/UserService";
import { IUserData } from "@/types/IUser";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const useUpdateUser = () => {
  return useMutation<any, Error, { userId: string; userData: IUserData }>({
    mutationKey: ["UPDATE_USER"],
    mutationFn: async ({ userId, userData }) =>
      await updateUser(userData, userId), // Destructure the input
    onSuccess: () => {
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteUser = () => {
  return useMutation<any, Error, { userId: string }>({
    mutationKey: ["DELETE_USER"],
    mutationFn: async ({ userId }) => await deleteUser(userId), // Destructure the input
    onSuccess: () => {
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
