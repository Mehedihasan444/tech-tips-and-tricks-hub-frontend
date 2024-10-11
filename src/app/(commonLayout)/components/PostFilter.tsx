"use client";
import { postCategories } from "@/app/(dashboardLayout)/(userDashboard)/dashboard/create-post/constant";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

const PostFilter = () => {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  return (
    <div className="flex gap-5">
      <Select
        name="category"
        className="max-w-xs"
        // label="Select your relevant Category"
        placeholder="Select a Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {postCategories.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </Select>
      <Select
       name="category"
      // label="Select your relevant Category"
        placeholder="Sort By"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="max-w-xs"
      >
        <SelectItem key={"latest"} value="latest">Latest</SelectItem>
        <SelectItem key={"upvoted"} value="upvoted">Most Upvoted</SelectItem>
      </Select>
    </div>
  );
};

export default PostFilter;
