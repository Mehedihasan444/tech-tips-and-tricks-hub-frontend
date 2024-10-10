"use client"
import React, { useState } from 'react';

const PostFilter = () => {
    const [category, setCategory] = useState('all');
    const [sort, setSort] = useState('latest');
    return (
        <div className="">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 mr-2"
        >
          <option value="all">All Categories</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="CSS">CSS</option>
          {/* Add more categories as needed */}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2"
        >
          <option value="latest">Latest</option>
          <option value="upvoted">Most Upvoted</option>
        </select>
      </div>
    );
};

export default PostFilter;