import { useMutation } from "@tanstack/react-query";
import { searchPosts } from "../services/Search";

export const useSearchPosts = () => {
  return useMutation({
    mutationKey: ["SEARCH_POSTS"],
    mutationFn: async (searchTerm: string) => await searchPosts(searchTerm),
  });
};