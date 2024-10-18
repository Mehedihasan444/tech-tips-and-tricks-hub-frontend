"use client";
import { TPost } from "@/types/TPost";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Divider, Spinner } from "@nextui-org/react";
import { getPosts } from "@/services/PostService";
import CreatePost from "./components/modal/CreatePost";
import PostFilter from "./components/PostFilter";
import PostCard from "./components/PostCard";

const NewsFeed = () => {
  const [data, setData] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [dataCame, setDataCame] = useState(true);

  // Load more posts for infinite scroll
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const { data: newPosts } = await getPosts(page);
    setPage((prevPage) => prevPage + 1);
    setData((prevData) => [...prevData, ...newPosts]); // Append new posts
    if (data) {
      setDataCame(false);
    }
    setHasMore(newPosts.length > 0); // Disable loading if no more posts
    setLoading(false);
  }, [page, hasMore, loading, setDataCame, data]);

  // Intersection Observer for triggering infinite scroll
  useEffect(() => {
    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMorePosts();
      }
    });

    if (currentLoader) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loaderRef, loadMorePosts, hasMore, loading]);

  return (
    <div className="max-w-5xl mx-auto">
      {/* filter with create button */}
      <section className="flex my-4 justify-between items-center">
        <div className="flex-1">
          {/* create post modal */}
          <CreatePost />
        </div>
        {/* filter */}
        <div className="flex-1">
          <PostFilter setData={setData} />
        </div>
      </section>
      <Divider className="my-5 bg-default-300" />
      {/* posts */}
      <section className="">
        {dataCame ? (
          <div className="h-[60vh] flex justify-center items-center">
            <Spinner label="Loading posts" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {data?.length > 0 ? (
              data?.map((post: TPost) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <div className="min-h-72">
                <h1 className="text-lg font-semibold text-default-700">
                  No data found!
                </h1>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Infinite scroll trigger element */}
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
};

export default NewsFeed;
