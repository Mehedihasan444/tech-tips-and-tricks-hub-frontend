/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Button, Divider, Link, User } from "@nextui-org/react";
import { ThumbsDown, ThumbsUp, Share2, MessageCircle } from "lucide-react";
import React, { useState } from "react";
import MediaGallery from "./MediaGallery";
import parse from "html-react-parser";
import { useUpdatePost } from "@/hooks/post.hook";
import { useUser } from "@/context/user.provider";

const CHARACTER_LIMIT = 430; // Set a character limit for description

const PostCard = ({ post }: { post: any }) => {
  // current login user
  const { user: loggedInUser } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const { mutate: handleUpdatePost } = useUpdatePost();
  const user = post?.author;

  // Function to handle sharing via Web Share API
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.description,
          url: window.location.href, // You can pass the post's link here
        })
        .then(() => console.log("Post shared successfully!"))
        .catch((error) => console.log("Error sharing the post:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };
  // Function to toggle read more/less
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const handleLikesAndDislikes = (id: number) => {
    // Update post likes and dislikes
    const formData = new FormData();
    const updatedPostData: {
      likes?: number;
      dislikes?: number;
    } = {};
    if (id == 0) {
      updatedPostData.dislikes = post.dislikes + 1;
    } else if (id == 1) {
      updatedPostData.likes = post.likes + 1;
    }
    formData.append("data", JSON.stringify(updatedPostData));
    handleUpdatePost({ formData, postId: post._id });
  };

  return (
    <div className="bg-default-50 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
      <div className="flex justify-between items-center gap-3 mb-2">
        <User
          name={user?.name}
          description={
            <Link href={`/profile/${user?.nickName}`} size="sm">
              {user?.nickName}
            </Link>
          }
          avatarProps={{
            src: `${user?.profilePhoto}`,
          }}
          className="text-default-900"
        />
        {/* Premium tag */}
        {post.isPremium && (
          <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            👑Premium
          </span>
        )}
      </div>
      <div className="flex justify-between items-center">
        <h3 className="">
          <Link
            href={`/posts/${post?._id}`}
            className="text-default-800 text-xl font-semibold "
          >
            Title: {post.title}
          </Link>
        </h3>
      </div>
      <div className="relative">
        <div
          className={` ${
            post?.isPremium && !loggedInUser?.isPremium ? "blur-sm" : ""
          }`}
        >
          <div className="text-gray-600 mt-2">
            <span className="inline">
              {isExpanded
                ? parse(post.content)
                : parse(post.content?.slice(0, CHARACTER_LIMIT) + "...")}

              {post.content?.length > CHARACTER_LIMIT && (
                <button
                  onClick={handleReadMore}
                  className="text-teal-600 hover:text-teal-800 text-sm ml-2 inline"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              )}
            </span>
          </div>

          {post?.images?.length > 0 && (
            <div className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                <MediaGallery media={post.images} />
              </div>
            </div>
          )}
        </div>
        <div
          className={`${
            post?.isPremium && loggedInUser?.isPremium ? "hidden" : ""
          } absolute top-0 right-0 left-0 bottom-0 font-medium px-5 py-3 flex justify-center items-center h-full`}
        >
          {post?.isPremium && !loggedInUser?.isPremium && (
            <div className=" flex flex-col items-center">
              <span className="font-semibold text-xl">
                This post is only available to premium users.
              </span>
              <div className="w-16">
                <Link href="/subscription">
                  <Button size="sm" variant="bordered" color="primary">
                    Get Subscription
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Categories or Tags */}
      {post.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags?.map((tag: string, index: number) => (
            <span
              key={index}
              className="inline-block cursor-pointer text-blue-800 text-sm font-medium px-1 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="my-3">
        <Divider />
      </div>

      {/* Post interaction buttons */}
      <div className="flex justify-between items-center gap-5 px-5">
        {/* Share Section */}
        <div className="flex items-center">
          <button
            onClick={handleShare}
            className="flex items-center text-sm text-teal-600 hover:text-teal-800"
          >
            <Share2 className="w-5 h-5 text-teal-500 mr-1" />
            Share
          </button>
        </div>

        <div>
          <MessageCircle className="w-5 h-5 text-teal-500 mr-1" />
        </div>

        {/* Upvote & Downvote Section */}
        <div className="flex justify-between gap-5">
          <div className="flex items-center gap-2">
            <button onClick={() => handleLikesAndDislikes(1)}>
              <ThumbsUp className="w-5 h-5 text-teal-500" />
            </button>
            <span className="text-sm text-teal-600">{post.likes}</span>
          </div>
          <div>
            <Divider orientation="vertical" />
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => handleLikesAndDislikes(0)}>
              <ThumbsDown className="w-5 h-5 text-teal-500" />
            </button>
            <span className="text-sm text-teal-600">{post.dislikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
