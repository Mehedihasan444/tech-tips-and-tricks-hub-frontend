"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { StoryCard } from "./stoey-card";
import { Button, Skeleton, Spinner } from "@nextui-org/react";
import { getStories } from "@/services/StoryService";

const SCROLL_AMOUNT = 300;
interface TStory {
  id: string;
  imageUrl: string;
  userImage: string;
  username: string;
  isAddStory?: boolean;
  timestamp: string;
}

// Default "Create Story" item that will always be shown first
const createStoryItem = {
  id: "add-story",
  imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  userImage: "",
  username: "Create Story",
  isAddStory: true,
  timestamp: "2h ago",
};

// Skeleton story card component
const StoryCardSkeleton = () => (
  <div className="flex-shrink-0 w-32 relative">
    <Skeleton className="rounded-xl h-48 w-full" />
    <div className="absolute bottom-3 left-0 right-0 px-2">
      <Skeleton className="h-5 w-16 mx-auto rounded-md" />
    </div>
    <div className="absolute top-3 left-3">
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  </div>
);

export function StoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedStory, setSelectedStory] = useState<TStory | null>(null);
  const [stories, setStories] = useState<TStory[]>([createStoryItem]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await getStories();
        
        // Format the API response to match our TStory interface
        const fetchedStories = response.data.map((story: any) => ({
          id: story.id,
          imageUrl: story.imageUrl,
          userImage: story.userImage,
          username: story.username,
          timestamp: story.timestamp,
        }));
        
        // Add the createStoryItem at the beginning
        setStories([createStoryItem, ...fetchedStories]);
        setError(null);
      } catch (err) {
        console.error('Error fetching stories:', err);
        setError('Failed to load stories');
        // Keep the createStoryItem even if fetch fails
        setStories([createStoryItem]);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);
  
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
      {loading ? (
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {/* Create Story skeleton is always first */}
            <div className="flex-shrink-0 w-32 relative">
              <Skeleton className="rounded-xl h-48 w-full" />
              <div className="absolute bottom-3 left-0 right-0 px-2">
                <Skeleton className="h-5 w-20 mx-auto rounded-md" />
              </div>
            </div>
            
            {/* Generate 5 skeleton cards */}
            {Array(5).fill(0).map((_, index) => (
              <StoryCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
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

            {stories.length > 3 && (
              <>
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
              </>
            )}
          </div>
        </>
      )}
      
      {selectedStory && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
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


