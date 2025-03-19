import { createStory } from "@/services/StoryService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateStory = () => {
    return useMutation<any, Error, FormData>({
      mutationKey: ["CREATE_STORY"],
      mutationFn: async (StoryData) => await createStory(StoryData),
      onSuccess: () => {
        toast.success("Story created successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };