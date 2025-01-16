"use client";

import { Avatar } from "@nextui-org/react";



interface StoryCardProps {
  imageUrl: string;
  userImage: string;
  username: string;
  isAddStory?: boolean;
  onClick?: () => void;
}

export function StoryCard({ imageUrl, userImage, username, isAddStory, onClick }: StoryCardProps) {
  return (
    <div
      onClick={onClick}
      className= "relative flex-shrink-0 cursor-pointer group w-[120px] h-[200px] rounded-xl overflow-hidden transition-transform duration-200 ease-in-out hover:scale-[1.02]"  
    >
      <img
        src={imageUrl}
        alt={`${username}'s story`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
      
      {!isAddStory ? (
        <>
          <div className="absolute top-4 left-4">
            <div className="rounded-full p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
            <Avatar
                src={userImage}
                className="w-10 h-10 border-2 border-white"
                fallback={username[0]}
              />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm font-medium truncate">{username}</p>
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </div>
          <p className="text-sm font-medium">Create Story</p>
        </div>
      )}
    </div>
  );
}