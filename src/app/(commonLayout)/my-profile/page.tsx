// "use client";
import React from "react";
import PostCard from "../components/PostCard";
import Image from "next/image";
import { Button, Divider } from "@nextui-org/react";
import CreatePost from "../components/modal/CreatePost";
import { ClipboardPenLine, Github, Globe, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
const user = {
  name: "John Doe",
  bio: "Web Developer | Tech Enthusiast | Coffee Lover",
  detailedBio:
    "পূজার ছুটিতে মেঘালয় ও দার্জিলিং এর মনোমুগ্ধকর প্রাকৃতিক সৌন্দর্য উপভোগ করতে চলে আসুন আমাদের সাথে। আমরা নিয়ে এসেছি রেগুলার প্যাকেজ , কাস্টমাইজ ট্যুর, এবং করপোরেট ট্যুর—যেকোনো গ্রুপ বা ব্যক্তিগত চাহিদা অনুযায়ী ট্যুর প্ল্যান করতে পারছেন। ",
  email: "johndoe@example.com",
  phone: "+1 (234) 567-8901",
  dateOfBirth: "",
  gender: "Male",
  maritalStatus: "single",
  address: "123 Main St, Springfield, USA",
  profilePicture: "https://via.placeholder.com/150",
  education: [],
  socialMedia: [
    { icon: <Globe size={17}/>, name: "Portfolio", url: "https://johndoe.com" },
    {
      icon: <Linkedin size={17} color="blue"/>,
      name: "linkedin",
      url: "https://www.linkedin.com/in/john-doe/",
    },
    { icon: <Github size={17} color="black"/>, name: "github", url: "https://github.com/johndoe" },
    { icon: <Twitter size={17} color="blue"/>, name: "twitter", url: "https://twitter.com/johndoe" },
  ],
  following: 545,
  followers: 342,
  //!fake data for development purposes
  posts: [
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
        "https://www.vecteezy.com/video/14927511-soap-bubbles-floating-in-the-air-with-natural-green-blurred-bokeh-background-for-children-and-kids-in-the-park",
        "https://gratisography.com/wp-content/uploads/2024/01/gratisography-covered-in-confetti-800x525.jpg",
        "https://youtu.be/Dyv_8ABdtUg",
        "https://www.youtube.com/shorts/ohGWuS46Ldc?feature=share",
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
  ],
};

const ProfilePage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 bg-teal-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Image
            width={100}
            height={100}
            src={
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
            }
            // src={user.profilePicture}
            alt={`${user.name}'s profile`}
            className="w-24 h-24 rounded-full"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {/* Followers Section */}
          <div className=" p-6  flex justify-between items-center flex-1 gap-5 text-center ">
            <div className="flex flex-col items-center justify-center">
              <p>{user.posts?.length}</p>
              <h2 className="text-lg font-semibold ">Posts</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{user.followers} </p>
              <h2 className="text-lg font-semibold ">Followers</h2>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{user.following}</p>
              <h2 className="text-lg font-semibold ">Following</h2>
            </div>
            <div className="ml-5">
              <button className="bg-secondary text-white px-4 py-2 rounded-md">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="my-3">
        <Divider />
      </div>
      <div className="flex justify-between items-center gap-5">
        {/* Bio Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex-1">
          <h2 className="text-xl font-semibold mb-4">Bio</h2>
          <p>{user.detailedBio}</p>
        </div>
      </div>
      <div className="flex justify-between gap-5 ">
        <div className="flex-1 min-w-96">
          {/* Personal Information Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="mb-2">
              <strong>Address:</strong> {user.address}
            </p>
            <p className="mb-2">
              <strong>Date of Birth:</strong> {user.dateOfBirth}
            </p>
            <p className="mb-2">
              <strong>Gender:</strong> {user.gender}
            </p>
            <p className="mb-2">
              <strong>Marital Status:</strong> {user.maritalStatus}
            </p>

            {/* Education Section */}
            <div className="mb-4">
              <strong>Education:</strong>
              {user.education.length > 0 ? (
                <ul className="list-disc list-inside">
                  {user.education.map((edu, index) => (
                    <li key={index}>{edu}</li>
                  ))}
                </ul>
              ) : (
                <p>No education information available.</p>
              )}
            </div>

            {/* Social Media Section */}
            <div>
              <strong>Social Media:</strong>
              <ul className="list-none space-y-1 list-inside mt-2">
                {user.socialMedia?.map((media, index) => {
                  // const [name, url] = Object.entries(media)[0];
                  return (
                    <li key={index} className="flex gap-2">
                   
                      <span className="text-xs">{media.icon}</span>
                      <Link
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary"
                      >
                        {media.name.charAt(0).toUpperCase() +
                          media.name.slice(1)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* Media Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center gap-5 mb-4">
              <h2 className="text-xl font-semibold ">Media</h2>
              <Button
                variant="ghost"
                className="border-secondary text-secondary hover:text-white hover:bg-secondary"
              >
                See All
              </Button>
            </div>
            <div className="grid grid-cols-2  gap-4">
              {user.posts
                .flatMap((post) => post.media)
                .slice(0, 4)
                .map((item, index) => {
                  const isImage = item.match(/\.(jpeg|jpg|gif|png|svg|webp)$/i);
                  let videoId;
                  if (item.includes("youtu.be")) {
                    // Extract video ID from the short URL
                    videoId = item.split("/").pop(); // Get the last part of the URL
                  } else {
                    // Extract video ID from the standard URL
                    videoId = item.split("v=")[1]?.split("&")[0]; // Extract video ID from full URL
                  }
                  return (
                    <div key={index} className="relative group">
                      {isImage ? (
                        <Image
                          width={200}
                          height={200}
                          src={item}
                          alt={`Media ${index + 1}`}
                          className="w-full h-36 object-cover rounded-md"
                        />
                      ) : (
                        <iframe
                          width="300"
                          height="200"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={`YouTube Video ${index + 1}`}
                          frameBorder="0"
                          allowFullScreen
                          className="w-full h-36 object-cover rounded-md"
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="">
          {" "}
          {/* Post Creation Option */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
            <Divider />
            <div className="flex justify-between gap-5 mt-2">
              <h3 className="font-semibold text-teal-600 flex gap-2">
                <ClipboardPenLine />
                What&lsquo;s on your mind?
              </h3>
              {/* <Textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            >
            </Textarea> */}
              <CreatePost />
              {/* <Button
              onClick={handlePostCreate}
              className="mt-2 bg-secondary text-white px-4 py-2 rounded-md"
            >
              Post
            </Button> */}
            </div>
          </div>
          {/* Previous Posts Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Previous Posts</h2>
            <div className="grid grid-cols-1 gap-4">
              {user.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
