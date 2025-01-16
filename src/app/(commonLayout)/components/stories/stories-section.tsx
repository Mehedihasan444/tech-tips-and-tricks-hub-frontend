"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoryCard } from "./stoey-card";
import { Button } from "@nextui-org/react";

const SCROLL_AMOUNT = 300;

const stories = [
  {
    id: "add-story",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    userImage: "",
    username: "Create Story",
    isAddStory: true,
  },
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    userImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    username: "John Doe",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    username: "Jane Smith",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    username: "Mike Johnson",
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    userImage: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    username: "Sarah Wilson",
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    userImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    username: "Alex Brown",
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
    userImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    username: "Alex Brown",
  },
];

export function StoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
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
              onClick={() => console.log(`Clicked story: ${story.id}`)}
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
    </div>
  );
}