"use client";
import { useGetSearchedPosts } from "@/hooks/search.hook";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import PostCard from "../components/PostCard";
import { TPost } from "@/types/TPost";
import { Spinner } from "@nextui-org/react";

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const { mutate: handleSearch, data,isPending
   } = useGetSearchedPosts();
  useEffect(() => {
    if (!search) return;
    handleSearch(search);
  }, [search, handleSearch]);
if (isPending){
  return <div className="h-screen flex items-center justify-center"><Spinner/></div>;
 
}
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 gap-5 my-5">
      {data?.data?.length>0?data?.data?.map((post: TPost) => (
        <PostCard key={post._id} post={post} />
      )):<h1 className="text-lg font-semibold">No data found!</h1>}
    </div>
  );
};

export default Page;
