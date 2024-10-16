import React from "react";
import { getPosts } from "@/services/PostService";
import NewsFeed from "./components/NewsFeed";

const HomePage = async () => {
  const { data: posts } = await getPosts();
  return (
    <div className="px-6 pb-6 max-w-5xl mx-auto ">
      {/* newsfeed */}
      <NewsFeed posts={posts} />
    </div>
  );
};

export default HomePage;
