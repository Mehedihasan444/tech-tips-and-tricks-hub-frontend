/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Link, Tooltip, User } from "@nextui-org/react";
import { ThumbsDown, ThumbsUp, Share2, MessageCircle, Bookmark, Clock, Crown, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import MediaGallery from "./MediaGallery";
import parse from "html-react-parser";
import { useUpdatePost } from "@/hooks/post.hook";
import { useUser } from "@/context/user.provider";
import { useRouter } from "next/navigation";
import Message from "./message/Message";
import { toast } from "sonner";
import { getAllCommentsOfASinglePost } from "@/services/CommentService";
import { IUser } from "@/types/IUser";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";
const CHARACTER_LIMIT = 430; // Set a character limit for description

const PostCard = ({ post }: { post: any }) => {
  const [messageOpen, setMessageOpen] = useState(false);
  const [numberOfComments, setNumberOfComments] = useState(0);
  // const [loading,setLoading] = useState(true)
  // current login user
  const { user: loggedInUser } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const { mutate: handleUpdatePost } = useUpdatePost();
  const user = post?.author;
  const router = useRouter();


  // Function to handle sharing via Web Share API
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.description,
          url: window.location.href, // You can pass the post's link here
        })
        .then(() => console.log("Post shared successfully!"))
        .catch((error) => console.log("Error sharing the post:", error));
    } else {
      toast.warning("Web Share API is not supported in your browser.");
    }
  };
  // Function to toggle read more/less
  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };
  const handleLikesAndDislikes = (id: number) => {
    // Update post likes and dislikes
    const formData = new FormData();
    const updatedPostData: {
      likes?: number;
      dislikes?: number;
    } = {};
    if (id == 0) {
      updatedPostData.dislikes = post.dislikes + 1;
    } else if (id == 1) {
      updatedPostData.likes = post.likes + 1;
    }
    formData.append("data", JSON.stringify(updatedPostData));
    handleUpdatePost({ formData, postId: post._id });
  };
  const handleMessage = () => {
    setMessageOpen(!messageOpen);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await getAllCommentsOfASinglePost(post._id);
        setNumberOfComments(data?.length);
        // setLoading(false)
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    if (post._id) {
      fetchComments(); // Call the API to fetch comments only once when the component mounts
    }
  }, [post, setNumberOfComments]); // Depend on postId so it only re-fetches if postId changes


  // handle bookmark
  const handleBookmark = (id: string) => {
    console.log(id);
  }

  return (
    // <div className="">
    //   <div className="bg-default-50 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4">
    //     <div className="flex justify-between items-center gap-3 mb-2">
    //       <User
    //         name={user?.name}
    //         description={
    //           <Link
    //             href={`/profile/${user?.nickName}`}
    //             size="sm"
    //             aria-label={`/profile/${user?.nickName}`}
    //           >
    //             {user?.nickName}
    //           </Link>
    //         }
    //         avatarProps={{
    //           src: `${user?.profilePhoto}`,
    //         }}
    //         className="text-default-900"
    //       />
    //       {/* Premium tag */}
    //       {post.isPremium && (
    //         <span className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
    //           👑Premium
    //         </span>
    //       )}
    //     </div>
    //     <div className="flex justify-between items-center">
    //       <div className="">
    //         {post?.isPremium && !loggedInUser?.isPremium ? (
    //           <h3 className="text-default-800 text-xl font-semibold ">
    //             Title: {post.title}
    //           </h3>
    //         ) : (
    //           <Link
    //             href={`/posts/${post?._id}`}
    //             aria-label={`/posts/${post?._id}`}
    //             className="text-default-800 text-xl font-semibold "
    //           >
    //             Title: {post.title}
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //     <div className="relative">
    //       <div
    //         className={` ${post?.isPremium &&
    //             !loggedInUser?.isPremium &&
    //             post?.author?.nickName != loggedInUser?.nickName
    //             ? "blur-sm"
    //             : ""
    //           }`}
    //       >
    //         <div className="text-default-600 mt-2">
    //           <span className="inline">
    //             {isExpanded
    //               ? parse(post.content)
    //               : parse(post.content?.slice(0, CHARACTER_LIMIT) + "...")}

    //             {post.content?.length > CHARACTER_LIMIT && (
    //               <button
    //                 disabled={
    //                   post?.isPremium &&
    //                   !loggedInUser?.isPremium &&
    //                   post?.author?.nickName != loggedInUser?.nickName
    //                 }
    //                 onClick={handleReadMore}
    //                 className="text-teal-600 hover:text-teal-800 text-sm ml-2 inline"
    //               >
    //                 {isExpanded ? "Show Less" : "Read More"}
    //               </button>
    //             )}
    //           </span>
    //         </div>

    //         {post?.images?.length > 0 && (
    //           <div className="mt-4">
    //             <div className="grid grid-cols-1 gap-4">
    //               <MediaGallery media={post?.images} />
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //       {post?.isPremium &&
    //         !loggedInUser?.isPremium &&
    //         post?.author?.nickName != loggedInUser?.nickName && (
    //           <div
    //             className={`${post?.isPremium && loggedInUser?.isPremium ? "hidden" : ""
    //               } absolute top-0 right-0 left-0 bottom-0 font-medium px-5 py-3 flex justify-center items-center h-full`}
    //           >
    //             {post?.isPremium &&
    //               !loggedInUser?.isPremium &&
    //               post?.author?.nickName != loggedInUser?.nickName && (
    //                 <div className=" flex flex-col items-center">
    //                   <span className="font-semibold text-xl">
    //                     This post is only available to premium users.
    //                   </span>
    //                   <div className="w-16">
    //                     <Button
    //                       size="sm"
    //                       variant="bordered"
    //                       color="primary"
    //                       onClick={() => router.push("/subscription")}
    //                     >
    //                       {/* <Link href="/subscription"> */}
    //                       Get Subscription
    //                       {/* </Link> */}
    //                     </Button>
    //                   </div>
    //                 </div>
    //               )}
    //           </div>
    //         )}
    //     </div>

    //     {/* Categories or Tags */}
    //     {post.tags?.length > 0 && (
    //       <div className="mt-3 flex flex-wrap gap-2">
    //         {post.tags?.map((tag: string, index: number) => (
    //           <span
    //             key={index}
    //             className="inline-block cursor-pointer text-blue-800 text-sm font-medium px-1 py-0.5 rounded-full"
    //           >
    //             #{tag}
    //           </span>
    //         ))}
    //       </div>
    //     )}

    //     {/* Divider */}
    //     <div className="my-3">
    //       <Divider />
    //     </div>

    //     {/* Post interaction buttons */}
    //     <div className="flex justify-between items-center gap-5 px-5">
    //       {/* Share Section */}
    //       <div className="flex items-center">
    //         <button
    //           onClick={handleShare}
    //           className="flex items-center text-sm text-teal-600 hover:text-teal-800"
    //         >
    //           <Share2 className="w-5 h-5 text-teal-500 mr-1" />
    //           Share
    //         </button>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <button onClick={handleMessage}>
    //           <MessageCircle className="w-5 h-5 text-teal-500 mr-1" />
    //         </button>
    //         <span className="text-sm text-teal-600">{numberOfComments}</span>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <button onClick={()=>handleBookmark(post._id)}>
    //           <Bookmark className="w-5 h-5 text-teal-500 mr-1" />
    //         </button>
    //       </div>

    //       {/* Upvote & Downvote Section */}
    //       <div className="flex justify-between gap-5">
    //         <div className="flex items-center gap-2">
    //           <button onClick={() => handleLikesAndDislikes(1)}>
    //             <ThumbsUp className="w-5 h-5 text-teal-500" />
    //           </button>
    //           <span className="text-sm text-teal-600">{post.likes}</span>
    //         </div>
    //         <div>
    //           <Divider orientation="vertical" />
    //         </div>
    //         <div className="flex items-center gap-2">
    //           <button onClick={() => handleLikesAndDislikes(0)}>
    //             <ThumbsDown className="w-5 h-5 text-teal-500" />
    //           </button>
    //           <span className="text-sm text-teal-600">{post.dislikes}</span>
    //         </div>
    //       </div>
    //     </div>
    //     {/* Divider */}
    //     <div className="my-3">
    //       <Divider className="" />
    //     </div>

    //     {messageOpen && (
    //       <div className="mt-2">
    //         <Message user={loggedInUser as IUser} post={post} />
    //       </div>
    //     )}
    //   </div>
    // </div>
    // <Card className="w-full bg-default-50 hover:shadow-xl transition-all duration-300">
    //     <CardHeader className="flex flex-col gap-3">
    //         <div className="flex justify-between items-center w-full">
    //             <div className="flex gap-3">
    //                 <User
    //                     name={user?.name}
    //                     description={
    //                         <Link
    //                             href={`/profile/${user?.nickName}`}
    //                             className="text-primary hover:underline"
    //                         >
    //                             {user?.nickName}
    //                         </Link>
    //                     }
    //                     avatarProps={{
    //                         src: user?.profilePhoto,
    //                         size: "lg",
    //                         className: "ring-2 ring-primary",
    //                     }}
    //                 />
    //             </div>
    //             <div className="flex items-center gap-2">
    //                 <Chip 
    //                     size="sm" 
    //                     variant="flat" 
    //                     color="primary"
    //                     startContent={<Clock size={14} />}
    //                 >
    //                     {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
    //                 </Chip>
    //                 <Button 
    //                     isIconOnly 
    //                     variant="light" 
    //                     onClick={() => handleBookmark(post._id)}
    //                 >
    //                     <Bookmark className="w-5 h-5" />
    //                 </Button>
    //             </div>
    //         </div>

    //     </CardHeader>

    //     <CardBody className="px-4 py-2 gap-4">
    //         <h3 className="text-xl font-semibold">{post.title}</h3>
    //         <p className="text-default-600">{post.description}</p>
    //         {post.image && (
    //             <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
    //                 <Image
    //                     src={post.image}
    //                     alt={post.title}
    //                     fill
    //                     className="object-cover"
    //                 />
    //             </div>
    //         )}
    //             {post.tags && (
    //             <div className="flex gap-2 flex-wrap">
    //                 {post.tags.map((tag: string, index: number) => (
    //                     <Chip 
    //                         key={index} 
    //                         size="sm" 
    //                         variant="flat"
    //                         className="text-xs"
    //                     >
    //                         #{tag}
    //                     </Chip>
    //                 ))}
    //             </div>
    //         )}
    //     </CardBody>

    //     <Divider />

    //     <CardFooter className="px-4 py-3">

    //         <div className="flex justify-between items-center w-full">
    //             <div className="flex gap-4">
    //                 <Tooltip content="Like">
    //                     <Button 
    //                         variant="light" 
    //                         startContent={<ThumbsUp className={`w-5 h-5 ${post.likes > 0 ? 'text-primary' : ''}`} />}
    //                         onClick={() => handleLikesAndDislikes(1)}
    //                     >
    //                         {post.likes}
    //                     </Button>
    //                 </Tooltip>
    //                 <Tooltip content="Dislike">
    //                     <Button 
    //                         variant="light" 
    //                         startContent={<ThumbsDown className={`w-5 h-5 ${post.dislikes > 0 ? 'text-danger' : ''}`} />}
    //                         onClick={() => handleLikesAndDislikes(0)}
    //                     >
    //                         {post.dislikes}
    //                     </Button>
    //                 </Tooltip>
    //                 <Tooltip content="Comments">
    //                     <Button 
    //                         variant="light" 
    //                         startContent={<MessageCircle className="w-5 h-5" />}
    //                         onClick={handleMessage}
    //                     >
    //                         {numberOfComments}
    //                     </Button>
    //                 </Tooltip>
    //             </div>
    //             <Button
    //                 variant="flat"
    //                 color="primary"
    //                 startContent={<Share2 className="w-5 h-5" />}
    //                 onClick={handleShare}
    //             >
    //                 Share
    //             </Button>
    //         </div>
    //     </CardFooter>
    // </Card>
    <div className="">

    <Card className="w-full bg-default-50 hover:shadow-xl transition-all duration-300">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-3">
            <User
              name={
                <div className="flex items-center gap-2">
                  {user?.name}
                  {user?.isPremium && (
                    <Tooltip content="Premium User">
                      <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </Tooltip>
                  )}
                </div>
              }
              description={
                <div className="flex flex-col">
                  <Link
                    href={`/profile/${user?.nickName}`}
                    className="text-primary hover:underline text-xs"
                  >
                    {user?.nickName}
                  </Link>
                  <span className="text-xs text-default-500">{user?.profession}</span>
                </div>
              }
              avatarProps={{
                src: user?.profilePhoto,
                size: "md",
                className: `ring-2 ${user?.isPremium ? 'ring-yellow-500' : 'ring-primary'}`,
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            {post.isTrending && (
              <Tooltip content="Trending Post">
                <Chip
                  startContent={<TrendingUp size={14} />}
                  color="warning"
                  variant="flat"
                  size="sm"
                >
                  Trending
                </Chip>
              </Tooltip>
            )}
            <Chip
              size="sm"
              variant="flat"
              color="primary"
              startContent={<Clock size={14} />}
            >
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </Chip>
          </div>
        </div>


      </CardHeader>

      <CardBody className="px-4 py-2 gap-4">
        <h3 className="text-xl font-semibold group cursor-pointer">
          {post?.isPremium && !loggedInUser?.isPremium ? (
            post.title
          ) : (
            <Link
              href={`/posts/${post?._id}`}
              aria-label={`/posts/${post?._id}`}
              className="text-default-800 text-xl font-semibold "
            >
              {post.title}
            </Link>
          )}
          {post.isPremium && (
            <Tooltip content="Premium Content">
              <Crown className="inline-block w-4 h-4 ml-2 text-yellow-500 fill-yellow-500" />
            </Tooltip>
          )}
        </h3>

        <div className="relative">
          <p className={`text-default-600 ${!isExpanded && 'line-clamp-3'}`} dangerouslySetInnerHTML={{
            __html: post.content
          }}>

          </p>
          {post.content?.length > 200 && (
            <Button
              size="sm"
              variant="light"
              className="mt-2"
              onClick={handleReadMore}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </Button>
          )}
        </div>




        {post?.images?.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-1 gap-4">
              <MediaGallery media={post?.images} />
            </div>
          </div>
        )}

        {post.tags && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag: string, index: number) => (
              <Chip
                key={index}
                size="sm"
                variant="flat"
                className="text-xs"
              >
                #{tag}
              </Chip>
            ))}
          </div>
        )}
      </CardBody>

      <Divider />

      <CardFooter className="px-4 py-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            <Tooltip content={`${post.likes} Likes`}>
              <Button
                variant="light"
                startContent={<ThumbsUp className={`w-5 h-5 ${post.likes > 0 ? 'text-primary' : ''}`} />}
                onClick={() => handleLikesAndDislikes(1)}
                isDisabled={!user && post.isPremiumContent}
              >
                {post.likes}
              </Button>
            </Tooltip>
            <Tooltip content={`${post.dislikes} Dislikes`}>
              <Button
                variant="light"
                startContent={<ThumbsDown className={`w-5 h-5 ${post.dislikes > 0 ? 'text-danger' : ''}`} />}
                onClick={() => handleLikesAndDislikes(0)}
                isDisabled={!user && post.isPremiumContent}
              >
                {post.dislikes}
              </Button>
            </Tooltip>
            <Tooltip content={`${numberOfComments} Comments`}>
              <Button
                variant="light"
                startContent={<MessageCircle className="w-5 h-5" />}
                onClick={handleMessage}
              >
                {numberOfComments}
              </Button>
            </Tooltip>
          </div>
          <div className="flex gap-2">
            <Button
              variant="flat"
              color="primary"
              startContent={<Share2 className="w-5 h-5" />}
              onClick={handleShare}
            >
              Share
            </Button>
            <Button
              isIconOnly
              variant="light"
              onClick={() => handleBookmark(post._id)}
              className={post.isBookmarked ? 'text-primary' : ''}
            >
              <Bookmark className="w-5 h-5" fill={post.isBookmarked ? 'currentColor' : 'none'} />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
     {messageOpen && (
       <div className="mt-2">
         <Message user={loggedInUser as IUser} post={post} />
       </div>
     )}
    </div>
  );
};

export default PostCard;
