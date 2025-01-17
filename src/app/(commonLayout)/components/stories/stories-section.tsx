"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { StoryCard } from "./stoey-card";
import { Button } from "@nextui-org/react";

const SCROLL_AMOUNT = 300;
interface TStory {
  id:string;
imageUrl:string;
userImage:string;
username:string;
isAddStory?: boolean;
timestamp:string;
}
const stories = [
  {
    id: "add-story",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    userImage: "",
    username: "Create Story",
    isAddStory: true,
    timestamp: "2h ago",
  },
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    username: "John Doe",
    timestamp: "12h ago",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    username: "Jane Smith",
    timestamp: "21h ago",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    username: "Mike Johnson",
    timestamp: "3h ago",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    userImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    username: "Sarah Wilson",
    timestamp: "7h ago",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    userImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    username: "Alex Brown",
    timestamp: "5h ago",
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    userImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    username: "Alex Brown",
    timestamp: "12h ago",
  },
];

export function StoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedStory, setSelectedStory] = useState<TStory|null>(null);
  // 
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleStoryClick = (story: TStory) => {
    setSelectedStory(story);
  };

  const closeStoryView = () => {
    setSelectedStory(null);
  };
  return (
    <div className="relative max-w-[900px] mx-auto px-4 py-6">
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              imageUrl={story.imageUrl}
              userImage={story.userImage}
              username={story.username}
              isAddStory={story.isAddStory}
              timestamp={story.timestamp}
              onClick={() => handleStoryClick(story)}
            />
          ))}
        </div>

        <Button
          isIconOnly
          variant="flat"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 shadow-lg bg-white/90 hover:bg-white"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          isIconOnly
          variant="flat"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 shadow-lg bg-white/90 hover:bg-white"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      {selectedStory && (
        <div className="fixed inset-0 bg-black  z-50 flex items-center justify-center">
          <button
            onClick={closeStoryView}
            className="absolute top-4 right-4 text-white text-xl"
          >
            <X/>
          </button>
          <div className="relative max-w-lg w-full h-[80vh]">
            <img
              src={selectedStory.imageUrl}
              alt={`${selectedStory.username}'s story fullscreen`}
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 left-4 flex items-center gap-3">
              <img
                src={selectedStory.userImage}
                alt={selectedStory.username}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <div className="text-white">
                <div className="font-medium">{selectedStory.username}</div>
                <div className="text-sm opacity-80">
                  {selectedStory?.timestamp}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


