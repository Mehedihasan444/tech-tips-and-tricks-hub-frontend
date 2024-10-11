import { TPost } from '@/types/TPost';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

const Media = ({posts}:{posts:TPost[]}) => {
    return (
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
          {posts?.map((post: TPost, index: number) =>
            post.images?.map((image: string) => (
              <Image
                key={index}
                alt="post image"
                src={image}
                height={200}
                width={200}
              />
            ))
          )}
        </div>
      </div>
    );
};

export default Media;