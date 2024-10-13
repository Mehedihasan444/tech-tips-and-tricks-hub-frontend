"use client";
import { postCategories } from "@/app/(dashboardLayout)/(userDashboard)/dashboard/create-post/constant";
import {
  useGetFilteredPosts,
  useGetFilteredPostsByCategory,
} from "@/hooks/search.hook";
import { TPost } from "@/types/TPost";
import { Select, SelectItem, } from "@nextui-org/react";
import React, { Dispatch, useEffect, useState } from "react";

const PostFilter = ({ setData }: { setData: Dispatch<TPost[]> }) => {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const {
    mutate: handleSortBy,
    data: sortedData,
    // isPending: isSortPending,
    isSuccess: isShortSuccess,
  } = useGetFilteredPosts();
  const {
    mutate: handleFilterCategory,
    data: categorizedData,
    // isPending: isCategoryPending,
    isSuccess: isCategorizedSuccess,
  } = useGetFilteredPostsByCategory();
  const [posts, setPosts] = useState([
    // categorizedData?.data,
    // sortedData?.data,
  ]);
  useEffect(() => {
    if (sort) {
      handleSortBy(sort);
    }
  }, [sort, handleSortBy]);

  useEffect(() => {
    if (category) {
      if (category=='all') {
     setCategory('')
      }
      handleFilterCategory(category);
    }
  }, [category, handleFilterCategory]);

  useEffect(() => {
    if (isShortSuccess) {
      setPosts(sortedData?.data);
    }
  }, [sortedData, isShortSuccess]);

  useEffect(() => {
    if (isCategorizedSuccess) {
      setPosts(categorizedData?.data);
    }
  }, [categorizedData, isCategorizedSuccess]);

  useEffect(() => {
    if (isShortSuccess || isCategorizedSuccess) {
      setData(posts);
    }
  }, [posts, isShortSuccess, isCategorizedSuccess, setData]);


  return (
    <div className="flex gap-5">
      <Select
        name="category"
        className="max-w-xs"
        // label="Select your relevant Category"
        placeholder="Select a Category"
        value={category}
        variant="bordered"
        onChange={(e) => setCategory(e.target.value)}
      >
        {
        postCategories?.map((item) => (<SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))
        }
      </Select>
      <Select
        name="sortBy"
        // label="Select your relevant Category"
        placeholder="Sort By"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="max-w-xs"
        variant="bordered"
      >
        <SelectItem key={"latest"} value="latest">
          Latest
        </SelectItem>
        <SelectItem key={"upvoted"} value="likes">
          Most Upvoted
        </SelectItem>
        <SelectItem key={"downvoted"} value="dislikes">
          Most Downvoted
        </SelectItem>
      </Select>
    </div>
  );
};

export default PostFilter;
