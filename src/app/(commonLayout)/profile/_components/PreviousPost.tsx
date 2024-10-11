import { TPost } from '@/types/TPost';
import React from 'react';
import PostCard from '../../components/PostCard';

const PreviousPost = ({posts}:{posts:TPost[]}) => {
    return (
        <div className="bg-default-50 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Previous Posts</h2>
            <div className="grid grid-cols-1 gap-4">
              {posts?.map((post: TPost) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </div>
    );
};

export default PreviousPost;