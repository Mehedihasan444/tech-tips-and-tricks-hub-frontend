"use client";
import { TPost } from "@/types/TPost";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Avatar, Button, Card, CardBody, CardHeader, Divider, Spinner, Chip } from "@nextui-org/react";
import { getPosts } from "@/services/PostService";
import CreatePost from "./components/modal/CreatePost";
import PostFilter from "./components/PostFilter";
import PostCard from "./components/PostCard";
// import Sidebar from "./components/Sidebar";
// import NavigationBar from "./components/shared/NavigationBar";
import { StoriesSection } from "./components/stories/stories-section";
import { UserPlus, TrendingUp } from "lucide-react";

const suggestedFriends = [
  {
    name: 'Sarah Chen',
    role: 'Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    mutualFriends: 12,
  },
  {
    name: 'Alex Morgan',
    role: 'UX Designer',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    mutualFriends: 8,
  },
  {
    name: 'Michael Foster',
    role: 'Tech Blogger',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    mutualFriends: 15,
  }
];

const NewsFeed = () => {
  const [data, setData] = useState<TPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [dataCame, setDataCame] = useState(true);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const limit = 2;
    const { data } = await getPosts(page, limit);
    const { data: newPosts } = data || {};
    setPage((prevPage) => prevPage + 1);
    setData((prevData) => [...prevData, ...newPosts]);
    if (data) {
      setDataCame(false);
    }
    setHasMore(newPosts.length > 0);
    setLoading(false);
  }, [page, hasMore, loading, setDataCame]);

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
    <div className="flex min-h-screen bg-default-50">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navigation Bar */}
        {/* <NavigationBar /> */}

        {/* Content Grid */}
        <div className="flex gap-6 px-6 py-4 max-w-[1600px] mx-auto w-full">
          {/* Main Feed */}
          <div className="flex-1 max-w-3xl mx-auto w-full space-y-6">
            {/* Stories Section */}
            <div className="bg-content1 rounded-2xl shadow-sm border border-divider overflow-hidden">
              <StoriesSection />
            </div>

            {/* Create Post & Filter Section */}
            <div className="bg-content1 rounded-2xl shadow-sm border border-divider p-4">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex-shrink-0">
                  <CreatePost />
                </div>
                <div className="flex-1 w-full sm:w-auto flex flex-row justify-end">
                  <PostFilter setData={setData} />
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="space-y-4">
              {dataCame ? (
                <div className="h-[60vh] flex flex-col justify-center items-center bg-content1 rounded-2xl border border-divider">
                  <Spinner size="lg" color="primary" />
                  <p className="text-default-500 mt-4">Loading posts...</p>
                </div>
              ) : (
                <>
                  {data?.length > 0 ? (
                    data?.map((post: TPost) => (
                      <PostCard key={post._id} post={post} />
                    ))
                  ) : (
                    <div className="bg-content1 rounded-2xl border border-divider p-12 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="w-16 h-16 bg-default-100 rounded-full flex items-center justify-center mx-auto">
                          <TrendingUp className="text-default-400" size={32} />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">
                          No Posts Found
                        </h3>
                        <p className="text-default-500">
                          Be the first to share something with the community!
                        </p>
                        <CreatePost />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Loading More Indicator */}
            {loading && data?.length > 0 && (
              <div className="flex justify-center py-6">
                <Spinner size="md" color="primary" />
              </div>
            )}

            {/* Infinite scroll trigger */}
            <div ref={loaderRef} className="h-10"></div>
          </div>

          {/* Right Sidebar - Friend Suggestions */}
          <aside className="hidden xl:block w-80 sticky top-20 h-fit">
            <Card className="shadow-sm border border-divider">
              <CardHeader className="flex justify-between items-center pb-3">
                <h3 className="text-lg font-semibold">Suggested For You</h3>
                <Chip size="sm" variant="flat" color="primary">
                  New
                </Chip>
              </CardHeader>
              <Divider />
              <CardBody className="gap-4 p-4">
                {suggestedFriends.map((friend) => (
                  <div key={friend.name} className="flex items-start gap-3 group">
                    <Avatar
                      src={friend.avatar}
                      size="md"
                      className="flex-shrink-0 ring-2 ring-transparent group-hover:ring-primary/20 transition-all"
                      isBordered
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate group-hover:text-primary transition-colors">
                        {friend.name}
                      </p>
                      <p className="text-xs text-default-500 truncate">{friend.role}</p>
                      <p className="text-xs text-default-400 mt-1">
                        {friend.mutualFriends} mutual friends
                      </p>
                    </div>
                    <Button
                      size="sm"
                      color="primary"
                      variant="flat"
                      startContent={<UserPlus size={14} />}
                      className="flex-shrink-0"
                    >
                      Follow
                    </Button>
                  </div>
                ))}

                <Divider className="my-2" />

                <Button
                  variant="light"
                  color="primary"
                  className="w-full font-semibold"
                >
                  See All Suggestions
                </Button>
              </CardBody>
            </Card>

            {/* Trending Topics Card */}
            <Card className="shadow-sm border border-divider mt-4">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary" />
                  <h3 className="text-lg font-semibold">Trending Topics</h3>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="gap-3 p-4">
                {['#WebDevelopment', '#ReactJS', '#AI', '#CloudComputing', '#CyberSecurity'].map((tag, index) => (
                  <button
                    key={tag}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-default-100 transition-colors text-left group"
                  >
                    <div>
                      <p className="text-sm font-semibold group-hover:text-primary transition-colors">
                        {tag}
                      </p>
                      <p className="text-xs text-default-400">
                        {(Math.random() * 10 + 1).toFixed(1)}K posts
                      </p>
                    </div>
                    <Chip size="sm" variant="flat" color="warning">
                      #{index + 1}
                    </Chip>
                  </button>
                ))}
              </CardBody>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;