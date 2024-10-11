"use client";
import React from "react";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { IUser } from "@/types/IUser";

type IEducation = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  gpa: string;
};

type IMedia = {
  platform: string;
  url: string;
};
//   //!fake data for development purposes
// const user = {
//   name: "John Doe",
//   bio: "Web Developer | Tech Enthusiast | Coffee Lover",
//   detailedBio:
//     "পূজার ছুটিতে মেঘালয় ও দার্জিলিং এর মনোমুগ্ধকর প্রাকৃতিক সৌন্দর্য উপভোগ করতে চলে আসুন আমাদের সাথে। আমরা নিয়ে এসেছি রেগুলার প্যাকেজ , কাস্টমাইজ ট্যুর, এবং করপোরেট ট্যুর—যেকোনো গ্রুপ বা ব্যক্তিগত চাহিদা অনুযায়ী ট্যুর প্ল্যান করতে পারছেন। ",
//   email: "johndoe@example.com",
//   phone: "+1 (234) 567-8901",
//   dateOfBirth: "",
//   gender: "Male",
//   maritalStatus: "single",
//   address: "123 Main St, Springfield, USA",
//   profilePicture: "https://via.placeholder.com/150",
//   education: [],
//   socialMedia: [
//     { icon: <Globe size={17}/>, name: "Portfolio", url: "https://johndoe.com" },
//     {
//       icon: <Linkedin size={17} color="blue"/>,
//       name: "linkedin",
//       url: "https://www.linkedin.com/in/john-doe/",
//     },
//     { icon: <Github size={17} color="black"/>, name: "github", url: "https://github.com/johndoe" },
//     { icon: <Twitter size={17} color="blue"/>, name: "twitter", url: "https://twitter.com/johndoe" },
//   ],
//   following: 545,
//   followers: 342,
//   posts: [
//     {
//       id: 1,
//       title: "How to Build a React App from Scratch",
//       description:
//         "Learn how to set up a new React project, structure components, and manage state effectively.",
//       upvotes: 150,
//       downvotes: 12,
//       date: "2024-09-30",
//       categories: ["React", "Frontend"],
//       media: [
//         "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_640.jpg",
//         "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//         "https://static.vecteezy.com/system/resources/thumbnails/039/210/128/small_2x/ai-generated-beautiful-nature-mountain-scenery-professionalgraphy-photo.jpg",
//         "https://www.vecteezy.com/video/14927511-soap-bubbles-floating-in-the-air-with-natural-green-blurred-bokeh-background-for-children-and-kids-in-the-park",
//         "https://gratisography.com/wp-content/uploads/2024/01/gratisography-covered-in-confetti-800x525.jpg",
//         "https://youtu.be/Dyv_8ABdtUg",
//         "https://www.youtube.com/shorts/ohGWuS46Ldc?feature=share",
//       ],
//     },
//     {
//       id: 2,
//       title: "Mastering JavaScript Closures and Scope",
//       description:
//         "Explore JavaScript closures, a powerful concept that helps you write cleaner and more efficient code.",
//       upvotes: 200,
//       downvotes: 30,
//       date: "2024-09-29",
//       categories: ["JavaScript", "Functional Programming"],
//       media: ["/images/js-closures.jpg"],
//       video: "https://www.example.com/js-closures-tutorial.mp4", // Video URL
//     },
//     {
//       id: 3,
//       title: "CSS Grid vs Flexbox: When to Use Which",
//       description:
//         "Understand the differences between CSS Grid and Flexbox, and learn when to use each for responsive designs.",
//       upvotes: 120,
//       downvotes: 8,
//       date: "2024-09-28",
//       categories: ["CSS", "HTML", "Frontend"],
//       media: [
//         "/images/css-grid-flexbox.jpg",
//         "https://www.example.com/css-grid-flexbox-video.mp4",
//       ],
//     },
//     {
//       id: 4,
//       title: "Demystifying Async/Await in JavaScript",
//       description:
//         "This guide helps you grasp asynchronous JavaScript and master promises, async, and await for better control over async operations.",
//       upvotes: 175,
//       downvotes: 25,
//       date: "2024-09-27",
//       categories: ["JavaScript", "Asynchronous Programming"],
//       media: [
//         "/images/async-await.jpg",
//         "https://www.example.com/async-await-tutorial.mp4",
//       ],
//     },
//     {
//       id: 5,
//       title: "Responsive Design with CSS Grid: Practical Examples",
//       description:
//         "Learn how to create beautiful and fully responsive layouts using CSS Grid with hands-on examples.",
//       upvotes: 90,
//       downvotes: 5,
//       date: "2024-09-26",
//       categories: ["CSS", "Responsive Design"],
//       media: ["/images/responsive-design-grid.jpg"],
//     },
//   ],
// };
const PersonalInformation = ({ user }: { user: IUser }) => {

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
      <p className="mb-2">
        <strong>Email:</strong> {user?.email}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {user?.mobileNumber}
      </p>
      <p className="mb-2">
        <strong>Date of Birth:</strong> {user?.dateOfBirth}
      </p>
      <p className="mb-2">
        <strong>Gender:</strong> {user?.gender}
      </p>
      <p className="mb-2">
        <strong>Marital Status:</strong> {user?.maritalStatus}
      </p>

      {/* Education Section */}
      <div className="mb-4">
        <strong>Education:</strong>
        {user?.education && user.education.length > 0 ? (
          <ul className="list-disc list-inside">
            {user.education.map((edu: IEducation, index: number) => (
              <li key={index}>
                {edu.institution} - {edu.degree} ({edu.startDate} -{" "}
                {edu.endDate}), GPA: {edu.gpa}
              </li>
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
          {user.socialMedia && user.socialMedia.length > 0 ? (
            user.socialMedia.map((media: IMedia, index: number) => {
              let IconComponent;
              switch (media.platform) {
                case "github":
                  IconComponent = Github;
                  break;
                case "linkedin":
                  IconComponent = Linkedin;
                  break;
                case "twitter":
                  IconComponent = Twitter;
                  break;
                case "portfolio":
                  IconComponent = Globe;
                  break;
                default:
                  IconComponent = null;
              }

              return (
                <li key={index} className="flex gap-2 items-center">
                  {IconComponent && (
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  )}
                  <Link
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary"
                  >
                    {media.platform.charAt(0).toUpperCase() +
                      media.platform.slice(1)}
                  </Link>
                </li>
              );
            })
          ) : (
            <p>No socialMedia information available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default PersonalInformation;
