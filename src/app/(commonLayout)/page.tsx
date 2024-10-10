import React from "react";
import { Divider } from "@nextui-org/react";
import PostCard from "./components/PostCard";
import PostFilter from "./components/PostFilter";
import CreatePost from "./components/modal/CreatePost";
//!fake data for development purposes
const posts = [
  {
    id: 1,
    title: "How to Build a React App from Scratch",
    description:
      "Learn how to set up a new React project, structure components, and manage state effectively.",
    upvotes: 150,
    downvotes: 12,
    date: "2024-09-30",
    categories: ["React", "Frontend"],
    media: [
      "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
      "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/039/210/128/small_2x/ai-generated-beautiful-nature-mountain-scenery-professionalgraphy-photo.jpg",
      "https://www.vecteezy.com/video/14927511-soap-bubbles-floating-in-the-air-with-natural-green-blurred-bokeh-background-for-children-and-kids-in-the-park","https://gratisography.com/wp-content/uploads/2024/01/gratisography-covered-in-confetti-800x525.jpg","https://youtu.be/Dyv_8ABdtUg","https://www.youtube.com/shorts/ohGWuS46Ldc?feature=share"
    ],
  },
  {
    id: 2,
    title: "Mastering JavaScript Closures and Scope",
    description:
      "Explore JavaScript closures, a powerful concept that helps you write cleaner and more efficient code.",
    upvotes: 200,
    downvotes: 30,
    date: "2024-09-29",
    categories: ["JavaScript", "Functional Programming"],
    media: ["/images/js-closures.jpg"],
    video: "https://www.example.com/js-closures-tutorial.mp4", // Video URL
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Which",
    description:
      "Understand the differences between CSS Grid and Flexbox, and learn when to use each for responsive designs.",
    upvotes: 120,
    downvotes: 8,
    date: "2024-09-28",
    categories: ["CSS", "HTML", "Frontend"],
    media: [
      "/images/css-grid-flexbox.jpg",
      "https://www.example.com/css-grid-flexbox-video.mp4",
    ],
  },
  {
    id: 4,
    title: "Demystifying Async/Await in JavaScript",
    description:
      "This guide helps you grasp asynchronous JavaScript and master promises, async, and await for better control over async operations.",
    upvotes: 175,
    downvotes: 25,
    date: "2024-09-27",
    categories: ["JavaScript", "Asynchronous Programming"],
    media: [
      "/images/async-await.jpg",
      "https://www.example.com/async-await-tutorial.mp4",
    ],
  },
  {
    id: 5,
    title: "Responsive Design with CSS Grid: Practical Examples",
    description:
      "Learn how to create beautiful and fully responsive layouts using CSS Grid with hands-on examples.",
    upvotes: 90,
    downvotes: 5,
    date: "2024-09-26",
    categories: ["CSS", "Responsive Design"],
    media: ["/images/responsive-design-grid.jpg"],
  },
];

const NewsFeed = () => {
  return (
    <div className="px-6 pb-6 max-w-5xl mx-auto">
      {/* filter with create button */}
      <section className="flex my-4 justify-between items-center">
        <div className="">
          {/* create post modal */}
          <CreatePost />
        </div>
        {/* filter */}
        <PostFilter />
      </section>
      <Divider className="my-5" />
      {/* posts */}
      <section className="grid grid-cols-1 gap-4">
        {posts?.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
};

export default NewsFeed;
