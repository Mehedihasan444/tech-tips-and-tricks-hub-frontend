import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/services/PostService";
import Filter from "./_componets/Filter";
import Paginate from "./_componets/Paginate";
import { TPost } from "@/types/TPost";

const allPosts = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    description:
      "A detailed guide on JavaScript closures, how they work, and common use cases.",
    date: "October 5, 2024",
    category: "JavaScript",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "React Hooks: A Complete Guide",
    description:
      "An in-depth exploration of React hooks and their applications in functional components.",
    date: "October 1, 2024",
    category: "React",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Mastering CSS Flexbox",
    description:
      "Learn the power of CSS Flexbox to create flexible and responsive layouts.",
    date: "September 25, 2024",
    category: "CSS",
    image: "https://via.placeholder.com/300x200",
  },
  // Add more posts as needed
];
const MyPosts = async () => {
  const { data: posts } = await getPosts();
  
  console.log(posts,"ddd")


  return (
    <div className="min-h-screen bg-gray-100 py-5 px-5 md:px-20">
      {/* Header */}

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-8 space-y-4 md:space-y-0">
        <div className="flex items-center">
          <h1 className="text-2xl border-l-5 border-primary font-bold pl-5 text-gray-800 ">
            My Posts
          </h1>
        </div>
      <Filter allPosts={posts}/>
      </div>
      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts?.map((post:TPost) => (
          <div
            key={post._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              width={300}
              height={300}
              src={post.images[0]}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <div className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: post.content }} />
              {/* <p >{post.content}</p> */}
              <p className="text-sm text-gray-500">{post.createdAt.split("T")[0]}</p>
            </div>
            <div className="p-6">
              <Link href={`/dashboard/my-posts/${post._id}`}>
              <button className="bg-secondary/80 hover:bg-secondary text-white py-2 px-4 rounded-lg">
                Read More
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <Paginate allPosts={allPosts}/>
    </div>
  );
};

export default MyPosts;
