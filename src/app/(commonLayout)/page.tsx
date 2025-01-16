"use client";
import { TPost } from "@/types/TPost";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Avatar, Button, Card, CardBody, CardHeader, Divider, Spinner } from "@nextui-org/react";
import { getPosts } from "@/services/PostService";
import CreatePost from "./components/modal/CreatePost";
import PostFilter from "./components/PostFilter";
import PostCard from "./components/PostCard";
import Sidebar from "./components/Sidebar";
import NavigationBar from "./components/shared/NavigationBar";
import { StoriesSection } from "./components/stories/stories-section";
const suggestedFriends = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Alex Morgan',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Foster',
    role: 'Tech Blogger',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
];


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
    const limit = 2;
    const { data } = await getPosts(page, limit);
    const { data: newPosts } = data || {};
    setPage((prevPage) => prevPage + 1);
    setData((prevData) => [...prevData, ...newPosts]); // Append new posts
    if (data) {
      setDataCame(false);
    }
    setHasMore(newPosts.length > 0); // Disable loading if no more posts
    setLoading(false);
  }, [page, hasMore, loading, setDataCame]);

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
    <div className="flex gap-4">
      <div className="">

        <Sidebar />
      </div>
      <div className="">

        <NavigationBar></NavigationBar>
        <div className="flex gap-4">

          <div className="max-w-4xl  mx-auto">
            {/* stories */}
            <div className="">
              <StoriesSection />
            </div>


            {/* filter with create button */}
            <section className="flex my-4 justify-between gap-4 items-center">
              <div className="sm:flex-1">
                {/* create post modal */}
                <CreatePost />
              </div>
              {/* filter */}
              <div className="flex-1">
                <PostFilter setData={setData} />
              </div>
            </section>
            <Divider className="my-5 text-default-300" />
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
          {/* Friend Suggestions */}
          <div className="">
            <Card className="hidden shadow-none rounded-none sticky top-16 h-screen lg:block min-w-80 p-4">
              <CardHeader>
                <h3 className="text-lg font-semibold">Suggested Friends</h3>
              </CardHeader>
              <Divider />
              <CardBody>
                <div className="space-y-4">
                  {suggestedFriends.map((friend) => (
                    <div key={friend.name} className="flex items-center gap-4">
                      <Avatar
                        src={friend.avatar}
                        size="md"
                        className="flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{friend.name}</p>
                        <p className="text-xs text-default-500 truncate">{friend.role}</p>
                      </div>
                      <Button size="sm" color="primary" variant="flat">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
