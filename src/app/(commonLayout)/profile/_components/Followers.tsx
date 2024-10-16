"use client";
import { useUser } from "@/context/user.provider";
import { useUpdateUser } from "@/hooks/user.hook";
import { IUser } from "@/types/IUser";
import { TPost } from "@/types/TPost";
import React from "react";

const Followers = ({ user, posts }: { user: IUser; posts: TPost[] }) => {
  const { user: loggedInUser } = useUser();
  const { mutate: handleUserUpdate } = useUpdateUser();


  const isFollower = () => {
    if (!loggedInUser || !user) return false; // Ensure loggedInUser and user are not null
    const res = user?.followers?.find((i) => i._id === loggedInUser._id);
    return res;
  };

  const handleFollowAndUnfollow = () => {
    if (!loggedInUser) return; // Ensure loggedInUser is not null
    const userData = {
      loggedInUserId: loggedInUser._id,
    };
    handleUserUpdate({ userId: user._id, userData });
  };

  
  return (
    <div className=" p-6  flex justify-between items-center flex-1 gap-5 text-center ">
      <div className="flex flex-col items-center justify-center">
        <p>{posts?.length}</p>
        <h2 className="text-lg font-semibold ">Posts</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>{user?.followers?.length || 0} </p>
        <h2 className="text-lg font-semibold ">Followers</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p>{user?.following?.length || 0}</p>
        <h2 className="text-lg font-semibold ">Following</h2>
      </div>
      <div className="ml-5">
        {loggedInUser?.nickName != user?.nickName ? (
          <button
            onClick={handleFollowAndUnfollow}
            className="bg-secondary text-white px-4 py-2 rounded-md"
          >
            {isFollower() ? "Following" : "Follow"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Followers;
