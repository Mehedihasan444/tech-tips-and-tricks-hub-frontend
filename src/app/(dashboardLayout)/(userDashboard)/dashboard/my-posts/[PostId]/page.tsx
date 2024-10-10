import { getPost } from "@/services/PostService";

interface IProps {
  params: {
    PostId: string;
  };
}

const PostDetailPage = async ({ params: { PostId } }: IProps) => {
  const { data: post } = await getPost(PostId);
console.log(post)
  return (
    <div>
      <div className="mx-auto my-3 max-w-[720px]">
        <h1 className="">hgjfwag{PostId}</h1>
        {/* <Post key={post?._id} post={post} /> */}
      </div>
    </div>
  );
};

export default PostDetailPage;
