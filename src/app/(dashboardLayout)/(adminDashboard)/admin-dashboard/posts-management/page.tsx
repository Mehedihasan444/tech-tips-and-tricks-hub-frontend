import React from "react";
import PostTable from "./_components/PostTable";
import { getPosts } from "@/services/PostService";

export default async function ManagePosts() {
  const { data: posts } = await getPosts();

  return (
    <div className="container mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-2xl mb-6 border-l-5 border-primary font-bold pl-5">
        Manage Posts
      </h1>
      <PostTable posts={posts} />
    </div>
  );
}
