import React from "react";
import { getMyPosts } from "@/services/PostService";
import PostTable from "./_components/PostTable";
// !only for development purposes
// ! it should be removed
// const posts = [
//   {
//     id: 1,
//     title: "How to Build a React App from Scratch",
//     description:
//       "Learn how to set up a new React project, structure components, and manage state effectively.",
//     upvotes: 150,
//     downvotes: 12,
//     date: "2024-09-30",
//     status: "Draft",
//     categories: ["React", "Frontend"],
//     name: "Tony Reichert",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     media: [
//       "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
//       "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//       "https://static.vecteezy.com/system/resources/thumbnails/039/210/128/small_2x/ai-generated-beautiful-nature-mountain-scenery-professionalgraphy-photo.jpg",
//       "https://www.vecteezy.com/video/14927511-soap-bubbles-floating-in-the-air-with-natural-green-blurred-bokeh-background-for-children-and-kids-in-the-park",
//       "https://gratisography.com/wp-content/uploads/2024/01/gratisography-covered-in-confetti-800x525.jpg",
//       "https://youtu.be/Dyv_8ABdtUg",
//       "https://www.youtube.com/shorts/ohGWuS46Ldc?feature=share",
//     ],
//   },
//   {
//     id: 2,
//     title: "Mastering JavaScript Closures and Scope",
//     description:
//       "Explore JavaScript closures, a powerful concept that helps you write cleaner and more efficient code.",
//     upvotes: 200,
//     downvotes: 30,
//     status: "vacation",
//     name: "Tony Reichert",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     date: "2024-09-29",
//     categories: ["JavaScript", "Functional Programming"],
//     media: ["/images/js-closures.jpg"],
//     video: "https://www.example.com/js-closures-tutorial.mp4", // Video URL
//   },
//   {
//     id: 3,
//     title: "CSS Grid vs Flexbox: When to Use Which",
//     description:
//       "Understand the differences between CSS Grid and Flexbox, and learn when to use each for responsive designs.",
//     upvotes: 120,
//     downvotes: 8,
//     status: "vacation",
//     name: "Tony Reichert",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     date: "2024-09-28",
//     categories: ["CSS", "HTML", "Frontend"],
//     media: [
//       "/images/css-grid-flexbox.jpg",
//       "https://www.example.com/css-grid-flexbox-video.mp4",
//     ],
//   },
//   {
//     id: 4,
//     title: "Demystifying Async/Await in JavaScript",
//     description:
//       "This guide helps you grasp asynchronous JavaScript and master promises, async, and await for better control over async operations.",
//     upvotes: 175,
//     downvotes: 25,
//     status: "active",
//     date: "2024-09-27",
//     name: "Tony Reichert",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     categories: ["JavaScript", "Asynchronous Programming"],
//     media: [
//       "/images/async-await.jpg",
//       "https://www.example.com/async-await-tutorial.mp4",
//     ],
//   },
//   {
//     id: 5,
//     title: "Responsive Design with CSS Grid: Practical Examples",
//     description:
//       "Learn how to create beautiful and fully responsive layouts using CSS Grid with hands-on examples.",
//     upvotes: 90,
//     downvotes: 5,
//     date: "2024-09-26",
//     name: "Tony Reichert",
//     status: "paused",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     categories: ["CSS", "Responsive Design"],
//     media: ["/images/responsive-design-grid.jpg"],
//   },
// ];

export default async function ManagePosts() {
  const { data: posts } = await getMyPosts();

  return (
    <div className="container mx-auto p-6 bg-white  rounded-lg">
      <h1 className="text-2xl mb-6 border-l-5 border-primary font-bold pl-5">
        Manage Posts
      </h1>
      <PostTable posts={posts} />
    </div>
  );
}
