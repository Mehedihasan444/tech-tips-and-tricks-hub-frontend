import React from "react";
import Image from "next/image";
import { Divider } from "@nextui-org/react";
import { ClipboardPenLine } from "lucide-react";
import CreatePost from "../../components/modal/CreatePost";

import { getUser } from "@/services/UserService";
import { getMyPosts } from "@/services/PostService";

import PersonalInformation from "../_components/PersonalInformation";
import Media from "../_components/Media";
import PreviousPost from "../_components/PreviousPost";
import Followers from "../_components/Followers";

interface IProps {
  params: {
    nickName: string;
  };
}

const ProfilePage = async ({ params: { nickName } }: IProps) => {
  const { data: user = {} } = await getUser(nickName);
  const { data: posts = {} } = await getMyPosts(user?._id);


  return (
    <div className="max-w-6xl mx-auto p-4 bg-teal-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Image
            width={100}
            height={100}
            src={user?.profilePhoto}
            alt={`${user?.name}'s profile`}
            className="w-24 h-24 rounded-full"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-gray-600">{user?.shortBio}</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {/* Followers Section */}
         <Followers user={user} posts={posts}/>
        </div>
      </div>{" "}
      <div className="my-3">
        <Divider />
      </div>
      <div className="flex justify-between items-center gap-5">
        {/* Bio Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 flex-1">
          <h2 className="text-xl font-semibold mb-4">Bio</h2>
          <p>{user?.bio}</p>
        </div>
      </div>
      <div className="flex justify-between gap-5 ">
        <div className="flex-1 min-w-96">
          {/* Personal Information Section */}
          <PersonalInformation user={user} />
          {/* Media Section */}
          <Media posts={posts} />
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
              {/* create post modal */}
              <CreatePost />
            </div>
          </div>
          {/* Previous Posts Section */}
          <PreviousPost posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
