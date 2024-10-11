import React from "react";
import { Divider } from "@nextui-org/react";
import PostCard from "./components/PostCard";
import PostFilter from "./components/PostFilter";
import CreatePost from "./components/modal/CreatePost";
import { getPosts } from "@/services/PostService";
import { TPost } from "@/types/TPost";

const NewsFeed =async () => {
  const { data: posts } = await getPosts();
  return (
    <div className="px-6 pb-6 max-w-5xl mx-auto">
      {/* filter with create button */}
      <section className="flex my-4 justify-between items-center">
        <div className="">
          {/* create post modal */}
          <CreatePost />
        </div>
        {/* filter */}
        <PostFilter />
      </section>
      <Divider className="my-5" />
      {/* posts */}
      <section className="grid grid-cols-1 gap-4">
        {posts?.map((post:TPost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>
    </div>
  );
};

export default NewsFeed;
