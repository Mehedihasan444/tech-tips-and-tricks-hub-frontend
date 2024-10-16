import { TComment } from "../_components/Messages";

export const updateCommentChildren = (
  comments: TComment[], 
  targetId: string, 
  newChild: TComment
) => {
  for (const comment of comments) {
    if (comment._id === targetId) {
      // Initialize Children if undefined
      comment.Children = comment.Children || [];
      comment.Children.push(newChild); // Add new child comment
      return comments; // Found and updated
    }
    // If not found, search in children
    if (comment.Children && comment.Children.length > 0) {
      const found = updateCommentChildren(comment.Children, targetId, newChild);
      if (found) return comments; // If found in the recursive call
    }
  }
  return comments; // If not found at all
};
