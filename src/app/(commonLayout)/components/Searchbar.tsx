
"use client";
import useDebounce from "@/hooks/debounce.hook";
import { useSearchPosts } from "@/hooks/search.hook";
import { TPost } from "@/types/TPost";
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Searchbar = () => {
  const { mutate: handleSearch, data, isSuccess } = useSearchPosts();
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<TPost[]>([]);
  const router = useRouter();
  const searchTerm = useDebounce(search);

  const handleSeeAll = (query: string) => {
    const queryString = query.trim().split(" ").join("+");
    router.push(`/posts?query=${queryString}`);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    } else {
      setSearchResults([]); // Clear results if searchTerm is empty
    }
  }, [searchTerm, handleSearch]);

  useEffect(() => {
    if (isSuccess && data && searchTerm) {
      setSearchResults(data?.data || []);
    }
  }, [isSuccess, data, searchTerm]);
  return (
    <div className="relative w-full">
      <div className="flex-1 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tech tips..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      {searchResults.length > 0 && (
        <div className="absolute top-14  mt-2 rounded-xl bg-default-100 p-3">
          <div className="space-y-3 overflow-y-auto h-[60vh] ">
            {searchResults?.map((post: TPost) => (
              <Link
                key={post._id} // Using post.id instead of index for better key usage
                className="text-default-900 block rounded-md border shadow-sm from-default-200 p-2 transition-all hover:bg-gradient-to-l"
                href={`/posts/${post._id}`}
              >
                <div className="flex items-center gap-2">
                  <Image
                    alt="item"
                    className="h-20 w-20 rounded-md"
                    height={80}
                    width={80}
                    src={post.images[0]}
                  />
                  <div>
                    <p className="text-sm font-semibold">{post.title}</p>
                    <p className="mt-1 w-full text-sm">
                      Category:
                      {
                        post.category
                      }
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {
                        post?.tags?.map(tag => <span className="text-blue-600 text-sm" key={tag}>#{tag}</span>)
                      }
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-3 flex justify-center border-t-1 border-default-50 pt-3">
            <Button
              variant="flat"
              className="flex items-center justify-center gap-1 w-full"
              onClick={() => handleSeeAll(searchTerm)}
            >
              See All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
