/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { Divider, Link, User } from "@nextui-org/react";
import { ThumbsDown, ThumbsUp, Share2, MessageCircle } from "lucide-react";
import React, { useState } from "react";
import MediaGallery from "./MediaGallery";

const PostCard = ({ post }: { post: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Define the character limit for the preview
  const CHARACTER_LIMIT = 400;

  // Function to handle "Read More" toggle
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  // Shorten description if not expanded
  const postDescription = isExpanded
    ? post.description
    : post.description.length > CHARACTER_LIMIT
    ? post.description.slice(0, CHARACTER_LIMIT) + "..."
    : post.description;

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

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
      <div className="flex gap-3 mb-2">
        <User
          name="Junior Garcia"
          description={
            <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
              @jrgarciadev
            </Link>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">
          Title: {post.title}
        </h3>
        {/* Premium tag */}
        {post.isPremium && (
          <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Premium
          </span>
        )}
      </div>

      {/* Post description */}
      <p className="text-gray-600 mt-2">
        {postDescription}

        {post?.description?.length > CHARACTER_LIMIT && (
          <button
            onClick={handleReadMore}
            className="text-teal-600 hover:text-teal-800 text-sm ml-2"
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
      </p>

      {/* Media Display (images/videos) */}
      <div className="mt-4">
        {post?.media?.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            <MediaGallery media={post.media} />
          </div>
        )}
      </div>
      {/* Categories or Tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {post.categories?.map((category: string, index: number) => (
          <span
            key={index}
            className="inline-block cursor-pointer text-blue-800 text-sm font-medium px-1 py-0.5 rounded-full"
          >
            #{category}
          </span>
        ))}
      </div>

      {/* Divider */}
      <div className="my-3">
        <Divider />
      </div>

      <div className="flex justify-between items-center gap-5 px-5">
        {/* Share Section */}
        <div className="flex justify-between items-center ">
          {/* Web Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center text-sm text-teal-600 hover:text-teal-800"
          >
            <Share2 className="w-5 h-5 text-teal-500 mr-1" />
            Share
          </button>
        </div>
        <div className="">
          <MessageCircle className="w-5 h-5 text-teal-500 mr-1" />
        </div>
        {/* Upvote & Downvote Section */}
        <div className="flex justify-between gap-5">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-teal-500" />
            <span className="text-sm text-teal-600">{post.upvotes}</span>
          </div>
          <div className="">
            <Divider orientation="vertical" />
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown className="w-5 h-5 text-teal-500" />
            <span className="text-sm text-teal-600">{post.downvotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
